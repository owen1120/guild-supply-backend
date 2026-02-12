const prisma = require('../utils/prisma');

const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: { userId }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId }
    });
  }
  return cart;
};

// ==============================
// 1. Inspect Pack (查看購物車)
// ==============================
const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { 
        product: { 
          select: { id: true, title: true, price: true, images: true, category: true } 
        } 
      },
      orderBy: { productId: 'asc' } 
    });

    let total = 0;
    const items = cartItems.map(item => {
      const subtotal = item.quantity * item.product.price;
      total += subtotal;
      return { 
        id: item.id, 
        productId: item.productId,
        title: item.product.title,
        price: item.product.price,
        image: item.product.images[0] || '', 
        quantity: item.quantity,
        subtotal: subtotal
      };
    });

    res.status(200).json({ 
      success: true, 
      data: { 
        items, 
        total,
        itemCount: items.length
      } 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: '無法查看背包: ' + error.message });
  }
};

// ==============================
// 2. Pack Item (加入購物車)
// ==============================
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body; 

    if (!productId) return res.status(400).json({ success: false, message: '缺少商品 ID' });

    const cart = await getOrCreateCart(req.user.id);

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ success: false, message: '找不到此商品' });

    const existingItem = await prisma.cartItem.findFirst({
      where: { 
        cartId: cart.id, 
        productId: productId 
      }
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: parseInt(quantity) } }
      });
    } else {
      await prisma.cartItem.create({
        data: { 
          cartId: cart.id, 
          productId: productId, 
          quantity: parseInt(quantity) 
        }
      });
    }

    res.status(200).json({ success: true, message: '商品已放入背包' });

  } catch (error) {
    res.status(500).json({ success: false, message: '無法加入購物車: ' + error.message });
  }
};

// ==============================
// 3. Adjust Load (修改數量)
// ==============================
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params; 
    const { quantity } = req.body;

    if (!quantity || parseInt(quantity) < 1) {
        return res.status(400).json({ success: false, message: '數量不能小於 1' });
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: parseInt(quantity) }
    });

    res.status(200).json({ success: true, message: '數量已調整' });

  } catch (error) {
    res.status(500).json({ success: false, message: '更新失敗，找不到該物品' });
  }
};

// ==============================
// 4. Drop Item (移除單一商品)
// ==============================
const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    await prisma.cartItem.delete({
      where: { id: itemId }
    });

    res.status(200).json({ success: true, message: '商品已丟棄' });

  } catch (error) {
    res.status(500).json({ success: false, message: '移除失敗' });
  }
};

// ==============================
// 5. Empty Backpack (清空購物車 - 這是我們額外建議的功能)
// ==============================
const clearCart = async (req, res) => {
    try {
        const cart = await getOrCreateCart(req.user.id);
        
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
        });

        res.status(200).json({ success: true, message: '背包已清空' });
    } catch (error) {
        res.status(500).json({ success: false, message: '清空失敗' });
    }
}

module.exports = { 
    getCart, 
    addToCart, 
    updateCartItem, 
    removeCartItem, 
    clearCart 
};