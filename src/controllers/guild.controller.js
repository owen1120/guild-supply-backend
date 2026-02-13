const prisma = require('../utils/prisma');
const bcrypt = require('bcryptjs');

// ==============================
// 1. Enhance Seal (修改密碼)
// ==============================
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: '舊咒語(密碼)不正確' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    res.status(200).json({ success: true, message: '封印已加強 (密碼修改成功)' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==============================
// 2. Void Contract (刪除帳號)
// ==============================
const deleteAccount = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.status(200).json({ success: true, message: '契約已銷毀 (帳號與所有資料已永久移除)' });
  } catch (error) {
    res.status(500).json({ success: false, message: '刪除失敗: ' + error.message });
  }
};

// ==============================
// 3. Trade History (歷史訂單)
// ==============================

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
          id: true,
          status: true,
          total: true,
          createdAt: true,
          items: {
              take: 1, 
              select: { productSnapshot: true } 
          }
      }
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取交易紀錄' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true 
      }
    });

    if (!order || order.userId !== userId) {
        return res.status(404).json({ success: false, message: '找不到該訂單或無權限查看' });
    }

    const formattedOrder = {
        order_id: order.id,
        user_id: order.userId,
        created_at: order.createdAt,
        updated_at: order.updatedAt,
        completed_at: order.completedAt,
        
        status: order.statusHistory || { current: order.status }, 
        
        items: order.items.map(item => {
            const snapshot = item.productSnapshot || {};
            return {
                product_id: item.productId,
                sku: snapshot.sku || 'UNKNOWN',
                name: snapshot.name || 'Unknown Item',
                quantity: item.quantity,
                unit_price: item.price,
                total_price: item.price * item.quantity,
                selected_options: snapshot.selected_options || [],
                media: snapshot.media || {},
                rpg_snapshot: snapshot.rpg_snapshot || {}
            };
        }),
        
        pricing_summary: order.pricingSummary || { total: order.total },
        shipping_info: order.shippingInfo || {},
        payment_info: order.paymentInfo || {},
        rpg_analytics: order.rpgAnalytics || {}
    };

    res.status(200).json({ success: true, data: formattedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取訂單詳情: ' + error.message });
  }
};

// ==============================
// 4. Backpack (背包/庫存)
// ==============================
const getInventory = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { 
        userId: req.user.id,
        status: { in: ['PAID', 'SHIPPED', 'COMPLETED'] } 
      },
      include: { items: { include: { product: true } } }
    });

    let backpack = [];
    orders.forEach(order => {
      order.items.forEach(item => {
        backpack.push({
          product: item.product,
          quantity: item.quantity,
          purchaseDate: order.createdAt
        });
      });
    });

    res.status(200).json({ success: true, data: backpack });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法開啟背包' });
  }
};

// ==============================
// 5. Wallet & Achievement
// ==============================
const getWallet = async (req, res) => {
  try {
    const userWallet = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { points: true, coupons: { where: { isUsed: false }, include: { coupon: true } } }
    });
    res.status(200).json({ success: true, data: userWallet || { points: 0, coupons: [] } });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法開啟錢包' });
  }
};

const getAchievements = async (req, res) => {
  try {
    const achievements = await prisma.userAchievement.findMany({
      where: { userId: req.user.id },
      include: { achievement: true },
      orderBy: { unlockedAt: 'desc' }
    });
    const badges = achievements.map(r => ({ ...r.achievement, unlockedAt: r.unlockedAt }));
    res.status(200).json({ success: true, data: badges });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取徽章' });
  }
};

// ==============================
// 6. Bookmarks (文章收藏)
// ==============================
const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(`🔍 [Bookmarks] 正在搜尋冒險者 ID: ${userId} 的收藏卷軸...`);

    const bookmarks = await prisma.userBookmark.findMany({
      where: { 
        userId: userId 
      },
      include: {
        article: true 
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`✅ [Bookmarks] 找到 ${bookmarks.length} 筆收藏`);

    res.status(200).json({ 
        success: true, 
        data: bookmarks 
    });

  } catch (error) {
    console.error('🔥 [getBookmarks] 錯誤:', error);

    res.status(500).json({ 
        success: false, 
        message: '無法讀取收藏卷軸', 
        error_detail: error.message 
    });
  }
};

const addBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { articleId } = req.body; 

    if (!articleId) {
      return res.status(400).json({ success: false, message: '請提供文章 ID' });
    }

    const article = await prisma.article.findUnique({
      where: { id: articleId }
    });

    if (!article) {
      return res.status(404).json({ success: false, message: '找不到該文章卷軸' });
    }
    
    const existingBookmark = await prisma.userBookmark.findUnique({
      where: {
        userId_articleId: { 
          userId: userId,
          articleId: articleId
        }
      }
    });

    if (existingBookmark) {
      return res.status(400).json({ success: false, message: '您已經收藏過這篇文章了' });
    }

    const newBookmark = await prisma.userBookmark.create({
      data: {
        userId: userId,
        articleId: articleId
      },
      include: {
        article: true 
      }
    });

    res.status(201).json({
      success: true,
      message: '成功加入收藏',
      data: newBookmark
    });

  } catch (error) {
    console.error('🔥 [addBookmark] 錯誤:', error);
    res.status(500).json({ 
        success: false, 
        message: '加入收藏失敗', 
        error_detail: error.message 
    });
  }
};

const removeBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: articleId } = req.params; 

    if (!articleId) {
      return res.status(400).json({ success: false, message: '請提供文章 ID' });
    }

    const bookmark = await prisma.userBookmark.findUnique({
      where: {
        userId_articleId: {
          userId: userId,
          articleId: articleId
        }
      }
    });

    if (!bookmark) {
      return res.status(404).json({ success: false, message: '收藏紀錄不存在，無法移除' });
    }

    await prisma.userBookmark.delete({
      where: {
        id: bookmark.id 
      }
    });

    res.status(200).json({ 
      success: true, 
      message: '已從收藏清單中移除' 
    });

  } catch (error) {
    console.error('🔥 [removeBookmark] 錯誤:', error);
    res.status(500).json({ 
      success: false, 
      message: '移除收藏失敗', 
      error_detail: error.message 
    });
  }
};

// ==============================
// 7. Wishlist (願望清單)
// ==============================
const getWishlist = async (req, res) => {
  try {
    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId: req.user.id },
      include: { product: { select: { id: true, title: true, price: true, images: true, stock: true } } },
      orderBy: { addedAt: 'desc' }
    });
    const data = wishlist.map(item => ({ ...item.product, addedAt: item.addedAt }));
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取願望清單' });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    await prisma.wishlistItem.create({ data: { userId: req.user.id, productId } });
    res.status(200).json({ success: true, message: '已加入願望清單' });
  } catch (error) {
    res.status(500).json({ success: false, message: '加入失敗 (可能已重複)' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.wishlistItem.delete({ where: { userId_productId: { userId: req.user.id, productId: id } } });
    res.status(200).json({ success: true, message: '已移除商品' });
  } catch (error) {
    res.status(500).json({ success: false, message: '移除失敗' });
  }
};

module.exports = { 
    changePassword, deleteAccount, 
    getOrders, getOrderById,
    getInventory, getWallet, getAchievements,
    getBookmarks, addBookmark, removeBookmark,
    getWishlist, addToWishlist, removeFromWishlist
};