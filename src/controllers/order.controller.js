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
    const { items } = req.body; 

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: '購物車是空的' });
    }

    const result = await prisma.$transaction(async (tx) => {
      
      const productIds = items.map(i => i.product_id || i.productId);
      
      const products = await tx.product.findMany({
        where: { id: { in: productIds } }
      });

      let totalPrice = 0;
      const orderItemsData = [];

      for (const item of items) {
        const targetId = item.product_id || item.productId;
        const product = products.find(p => p.id === targetId);

        if (!product) {
          throw new Error(`找不到商品 ID: ${targetId}`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`商品 ${product.title} 庫存不足 (剩餘: ${product.stock})`);
        }

        const unitPrice = product.price; 
        const lineTotal = unitPrice * item.quantity;
        totalPrice += lineTotal;

        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: unitPrice, 
          
          productSnapshot: {
            title: product.title,
            rpg_tuning: product.rpgDetails || {} 
          }
        });

        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.quantity } }
        });
      }

      const newOrder = await tx.order.create({
        data: {
          userId,
          total: totalPrice,
          status: 'PENDING',
          items: {
            create: orderItemsData 
          }
        },
        include: { items: true } 
      });

      return newOrder;
    });

    res.status(201).json({ 
      success: true, 
      message: '訂單建立成功', 
      orderId: result.id,
      data: result 
    });

  } catch (error) {
    console.error('🔥 下單失敗:', error);
    res.status(500).json({ success: false, message: '下單失敗: ' + error.message });
  }
};

module.exports = { previewOrder, createOrder };