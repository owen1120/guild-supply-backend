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
      include: {
        items: { include: { product: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取交易紀錄' });
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
// 5. Check Pouch (查詢錢包)
// ==============================
const getWallet = async (req, res) => {
  try {
    const userWallet = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        points: true,
        coupons: { where: { isUsed: false }, include: { coupon: true } }
      }
    });
    const data = userWallet || { points: 0, coupons: [] };
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法開啟錢包' });
  }
};

// ==============================
// 6. Medal Case (成就牆)
// ==============================
const getAchievements = async (req, res) => {
  try {
    const achievements = await prisma.userAchievement.findMany({
      where: { userId: req.user.id },
      include: { achievement: true },
      orderBy: { unlockedAt: 'desc' }
    });

    const badges = achievements.map(record => ({
      title: record.achievement.title,
      description: record.achievement.description,
      icon: record.achievement.icon,
      unlockedAt: record.unlockedAt
    }));

    res.status(200).json({ success: true, data: badges });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取徽章' });
  }
};

// ==============================
// 7. Personal Archive (文章收藏)
// ==============================
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await prisma.userBookmark.findMany({
      where: { userId: req.user.id },
      include: { article: { select: { id: true, title: true, summary: true, thumbnail: true, slug: true } } },
      orderBy: { createdAt: 'desc' }
    });
    const data = bookmarks.map(b => ({ ...b.article, bookmarkedAt: b.createdAt }));
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取收藏卷軸' });
  }
};

const addBookmark = async (req, res) => {
  try {
    const { articleId } = req.body;
    if (!articleId) return res.status(400).json({ success: false, message: '缺少文章 ID' });

    const existing = await prisma.userBookmark.findUnique({
      where: { userId_articleId: { userId: req.user.id, articleId } }
    });
    if (existing) return res.status(400).json({ success: false, message: '已收藏' });

    await prisma.userBookmark.create({ data: { userId: req.user.id, articleId } });
    res.status(200).json({ success: true, message: '收藏成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '收藏失敗' });
  }
};

const removeBookmark = async (req, res) => {
  try {
    const { id } = req.params; 
    await prisma.userBookmark.delete({
      where: { userId_articleId: { userId: req.user.id, articleId: id } }
    });
    res.status(200).json({ success: true, message: '已移除收藏' });
  } catch (error) {
    res.status(500).json({ success: false, message: '移除失敗' });
  }
};

// ==============================
// ✨ 8. Wishlist (願望清單) [新增]
// ==============================

// 查看詳細願望清單 (含商品資訊)
const getWishlist = async (req, res) => {
  try {
    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId: req.user.id },
      include: { 
        product: { 
            // 只抓取列表需要的簡單資訊
            select: { id: true, title: true, price: true, images: true, stock: true } 
        } 
      },
      orderBy: { addedAt: 'desc' }
    });

    // 整理資料格式
    const data = wishlist.map(item => ({
        ...item.product,
        addedAt: item.addedAt
    }));

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取願望清單' });
  }
};

// 加入願望清單
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: '缺少商品 ID' });

    // 檢查重複
    const existing = await prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId: req.user.id, productId } }
    });

    if (existing) {
        return res.status(400).json({ success: false, message: '這項裝備已經在清單中了' });
    }

    await prisma.wishlistItem.create({
      data: { userId: req.user.id, productId }
    });

    res.status(200).json({ success: true, message: '已加入願望清單' });
  } catch (error) {
    res.status(500).json({ success: false, message: '加入失敗' });
  }
};

// 移除願望清單
const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params; 

    await prisma.wishlistItem.delete({
      where: { userId_productId: { userId: req.user.id, productId: id } }
    });

    res.status(200).json({ success: true, message: '已移除商品' });
  } catch (error) {
    res.status(500).json({ success: false, message: '移除失敗' });
  }
};

module.exports = { 
    changePassword, 
    deleteAccount, 
    getOrders, 
    getInventory, 
    getWallet, 
    getAchievements,
    getBookmarks, 
    addBookmark, 
    removeBookmark,
    getWishlist,
    addToWishlist,
    removeFromWishlist
};