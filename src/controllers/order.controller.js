const prisma = require('../utils/prisma');

// ==============================
// 1. Preview Order (結帳試算)
// ==============================
const previewOrder = async (req, res) => {
  try {
    const { items, discountCode } = req.body; 

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: '購物車是空的' });
    }

    // 1. 撈取商品資料 (只撈需要的欄位)
    const productIds = items.map(i => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, title: true, price: true, stock: true, rpgDetails: true }
    });

    // 2. 計算小計 (Subtotal)
    let subtotal = 0;
    const lineItems = items.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) throw new Error(`找不到商品 ID: ${item.productId}`);
      
      const total = product.price * item.quantity;
      subtotal += total;

      return {
        productId: product.id,
        title: product.title,
        unitPrice: product.price,
        quantity: item.quantity,
        total,
        rpg: product.rpgDetails
      };
    });

    // 3. 計算運費與折扣 (這裡簡化處理)
    const shippingFee = subtotal > 3000 ? 0 : 100;
    let discountAmount = 0;
    
    if (discountCode === 'GUILD_MEMBER_V') discountAmount = 500;

    const tax = Math.round((subtotal - discountAmount) * 0.05); 
    const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount + tax);

    res.status(200).json({
      success: true,
      data: {
        currency: "TWD",
        subtotal,
        shipping_fee: shippingFee,
        discount: discountAmount,
        tax,
        grand_total: grandTotal,
        items: lineItems
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: '試算失敗: ' + error.message });
  }
};

// ==============================
// 2. Create Order (正式下單)
// ==============================
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
        items,
        shipping_info,
        payment_info,
        discount_code   
    } = req.body;

    if (!items || items.length === 0) return res.status(400).json({ success: false, message: '無法建立空訂單' });

    const result = await prisma.$transaction(async (tx) => {
      
      // 1. 撈取商品最新資料 (鎖定價格與快照)
      const productIds = items.map(i => i.productId);
      const products = await tx.product.findMany({
        where: { id: { in: productIds } }
      });

      // 2. 準備 Order Item Data & 計算總額
      let subtotal = 0;
      let totalLootWeight = 0;
      let totalRarityScore = 0;
      
      const rarityMap = { 'N': 1, 'R': 10, 'SR': 50, 'SSR': 100, 'UR': 500 };

      const orderItemsData = items.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) throw new Error(`商品 ${item.productId} 已下架或不存在`);
        if (product.stock < item.quantity) throw new Error(`商品 ${product.title} 庫存不足`);

        const lineTotal = product.price * item.quantity;
        subtotal += lineTotal;

        const rpg = product.rpgDetails || {};
        const rarity = rpg.rarity || 'N';
        const weight = 100; 
        
        totalLootWeight += weight * item.quantity;
        totalRarityScore += (rarityMap[rarity] || 1) * item.quantity;

        return {
          productId: product.id,
          quantity: item.quantity,
          price: product.price, 
          
          productSnapshot: {
             sku: product.sku,
             name: product.title,
             selected_options: item.selectedOptions || [],
             media: product.images ? { thumbnail_url: product.images[0]?.url } : {},
             rpg_snapshot: {
                 rarity: rarity,
                 tags: rpg.tags || []
             }
          }
        };
      });
      
      for (const item of items) {
          await tx.product.update({
              where: { id: item.productId },
              data: { stock: { decrement: item.quantity } }
          });
      }

      // 3. 計算最終金額 (Pricing Summary)
      const shippingFee = subtotal > 3000 ? 0 : 100;
      let discountAmount = 0;
      if (discount_code === 'GUILD_MEMBER_V') discountAmount = 500;
      
      const tax = Math.round((subtotal - discountAmount) * 0.05);
      const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount + tax);

      // 4. 建立訂單 (Create Order)
      const newOrder = await tx.order.create({
        data: {
          userId: userId,
          status: 'PAID', 
          total: grandTotal,
          
          statusHistory: {
              current: "PROCESSING",
              rpg_display: "LOOT_PREPARING",
              history: [
                  { status: "CREATED", timestamp: new Date(), note: "Contract signed." },
                  { status: "PAID", timestamp: new Date(), note: "Gold coins received." }
              ]
          },

          pricingSummary: {
              currency: "TWD",
              subtotal,
              shipping_fee: shippingFee,
              discount: { code: discount_code, amount: discountAmount },
              tax,
              grand_total: grandTotal
          },

          shippingInfo: shipping_info || {}, 

          paymentInfo: {
              ...payment_info,
              status: "PAID"
          },

          rpgAnalytics: {
              total_loot_weight: totalLootWeight,
              total_rarity_score: totalRarityScore,
              adventure_ready_status: totalRarityScore > 100 ? "HIGH" : "NORMAL"
          },

          items: {
              create: orderItemsData
          }
        },
        include: {
            items: true 
        }
      });

      // 5. 清空購物車 (Clear Cart)
      await tx.cart.delete({ where: { userId } }).catch(() => {}); 

      return newOrder;
    });

    res.status(201).json({ success: true, message: '訂單契約已成立', data: result });

  } catch (error) {
    res.status(500).json({ success: false, message: '下單失敗: ' + error.message });
  }
};

module.exports = { previewOrder, createOrder };