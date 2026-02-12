const prisma = require('../utils/prisma');
const bcrypt = require('bcryptjs');

// ==============================
// 1. Enhance Seal (修改密碼)
// ==============================
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    // 找人
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    // 驗證舊密碼
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: '舊咒語(密碼)不正確' });
    }

    // 加密新密碼
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 更新
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
    await prisma.user.delete({
      where: { id: req.user.id }
    });

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
        items: {
          include: { product: true }
        }
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
      include: {
        items: { include: { product: true } }
      }
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
// 5. Checkout (測試用下單 - 保留但不建議使用了)
// ==============================
const checkout = async (req, res) => {
    try {
        const { items } = req.body; 
        const newOrder = await prisma.order.create({
            data: {
                userId: req.user.id,
                status: 'PAID',
                total: 9999,    
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: 500 
                    }))
                }
            }
        });
        res.status(201).json({ success: true, message: '下單成功', order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: '下單失敗: ' + error.message });
    }
}

// ==============================
// 6. Check Pouch (查詢錢包)
// ==============================
const getWallet = async (req, res) => {
  try {
    const userWallet = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        points: true,
        coupons: {
          where: { isUsed: false },
          include: { coupon: true }
        }
      }
    });

    const data = userWallet || { points: 0, coupons: [] };
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法開啟錢包' });
  }
};

// ==============================
// 7. Medal Case (成就牆)
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
// ✨ 8. Personal Archive (我的收藏列表) [新增]
// ==============================
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await prisma.userBookmark.findMany({
      where: { userId: req.user.id },
      include: {
        article: { 
            select: { id: true, title: true, summary: true, category: true, thumbnail: true, slug: true }
        }
      },
      orderBy: { createdAt: 'desc' } 
    });

    const data = bookmarks.map(b => ({
        ...b.article,
        bookmarkedAt: b.createdAt
    }));

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取收藏卷軸' });
  }
};

// ==============================
// ✨ 9. Copy Scroll (新增收藏) [新增]
// ==============================
const addBookmark = async (req, res) => {
  try {
    const { articleId } = req.body; 

    if (!articleId) return res.status(400).json({ success: false, message: '缺少文章 ID' });

    const existing = await prisma.userBookmark.findUnique({
      where: {
        userId_articleId: { userId: req.user.id, articleId }
      }
    });

    if (existing) {
      return res.status(400).json({ success: false, message: '這卷軸已經在你的背包裡了' });
    }

    await prisma.userBookmark.create({
      data: { userId: req.user.id, articleId }
    });

    res.status(200).json({ success: true, message: '收藏成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '收藏失敗: ' + error.message });
  }
};

// ==============================
// ✨ 10. Discard Scroll (移除收藏) [新增]
// ==============================
const removeBookmark = async (req, res) => {
  try {
    const { id } = req.params; 

    await prisma.userBookmark.delete({
      where: {
        userId_articleId: { userId: req.user.id, articleId: id }
      }
    });

    res.status(200).json({ success: true, message: '已移除收藏' });
  } catch (error) {
    res.status(500).json({ success: false, message: '移除失敗 (可能原本就沒收藏)' });
  }
};

module.exports = { 
    changePassword, 
    deleteAccount, 
    getOrders, 
    getInventory, 
    checkout, 
    getWallet, 
    getAchievements,
    getBookmarks, 
    addBookmark, 
    removeBookmark 
};