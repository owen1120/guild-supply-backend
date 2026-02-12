const express = require('express');
const router = express.Router();

// --- 1. 引入所有控制器 (Controllers) ---
const clientController = require('../controllers/clientProduct.controller');
const authController = require('../controllers/adminAuth.controller');
const adminProductController = require('../controllers/adminProduct.controller');
const addressController = require('../controllers/address.controller');
const guildController = require('../controllers/guild.controller');
const questController = require('../controllers/quest.controller');
const cartController = require('../controllers/cart.controller');
const orderController = require('../controllers/order.controller');
const libraryController = require('../controllers/library.controller');

// ✨ [新增] 引入後台專用控制器
const adminOrderController = require('../controllers/adminOrder.controller');
const adminLibraryController = require('../controllers/adminLibrary.controller');
const adminQuestController = require('../controllers/adminQuest.controller');

// --- 2. 引入 Middleware ---
// ⚠️ 注意：這裡改成解構賦值，因為我們現在匯出了兩個函式
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// ==============================
// 🛒 1. Armory: 客戶端產品 (Public)
// ==============================
router.get('/products/categories', clientController.getCategories);
router.get('/products/featured', clientController.getFeaturedProducts);
router.get('/products', clientController.getProducts);
router.get('/products/:id', clientController.getProductById);


// ==============================
// 🔐 2. Auth: 身份驗證
// ==============================
router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.post('/auth/refresh', authController.refreshToken);
router.post('/auth/password/forgot', authController.forgotPassword);
router.post('/auth/password/reset', authController.resetPassword);


// ==============================
// 🏰 3. Guild: 公會會員中心 (需 Token)
// ==============================
// --- 基本資料 ---
router.get('/guild/profile', verifyToken, authController.getProfile);
router.put('/guild/profile', verifyToken, authController.updateProfile);

// --- 地址管理 ---
router.get('/guild/addresses', verifyToken, addressController.getAddresses);
router.post('/guild/addresses', verifyToken, addressController.addAddress);
router.delete('/guild/addresses/:id', verifyToken, addressController.deleteAddress);

// --- 帳號與交易 ---
router.put('/guild/password', verifyToken, guildController.changePassword);
router.delete('/guild/account', verifyToken, guildController.deleteAccount);
router.get('/guild/orders', verifyToken, guildController.getOrders);
router.get('/guild/inventory', verifyToken, guildController.getInventory);

// --- 遊戲化 (錢包、成就、任務日誌) ---
router.get('/guild/wallet', verifyToken, guildController.getWallet);
router.get('/guild/achievements', verifyToken, guildController.getAchievements);
router.get('/guild/quests', verifyToken, questController.getMyQuests);

// --- 收藏管理 ---
router.get('/guild/bookmarks', verifyToken, guildController.getBookmarks);
router.post('/guild/bookmarks', verifyToken, guildController.addBookmark);
router.delete('/guild/bookmarks/:id', verifyToken, guildController.removeBookmark);


// ==============================
// 📜 4. Quest: 任務系統 (需 Token)
// ==============================
router.get('/quests', verifyToken, questController.getQuests);
router.post('/quests/:id/accept', verifyToken, questController.acceptQuest);
router.post('/quests/:id/claim', verifyToken, questController.claimReward);
router.post('/quests/:id/progress', verifyToken, questController.debugProgress);


// ==============================
// 🚚 5. Logistics: 購物車與結帳 (需 Token)
// ==============================
// --- 購物車 ---
router.get('/cart', verifyToken, cartController.getCart);
router.post('/cart', verifyToken, cartController.addToCart);
router.patch('/cart/:itemId', verifyToken, cartController.updateCartItem);
router.delete('/cart/:itemId', verifyToken, cartController.removeCartItem);
router.delete('/cart', verifyToken, cartController.clearCart);

// --- 結帳 ---
router.post('/orders/preview', verifyToken, orderController.previewOrder);
router.post('/orders', verifyToken, orderController.createOrder);


// ==============================
// 📚 6. The Library: 知識庫 (Public)
// ==============================
router.get('/library/categories', libraryController.getCategories);
router.get('/library/scrolls', libraryController.getScrolls);
router.get('/library/scrolls/:id', libraryController.getScrollById);
router.post('/library/scrolls/:id/like', libraryController.likeScroll);


// ==============================
// 🛡️ 7. Admin: 公會長辦公室 (需 Token + Admin權限)
// ==============================

// --- 商品管理 (Armory) ---
router.get('/admin/products', verifyToken, verifyAdmin, adminProductController.getAdminProducts);
router.post('/admin/products', verifyToken, verifyAdmin, adminProductController.createProduct);
router.put('/admin/products/:id', verifyToken, verifyAdmin, adminProductController.updateProduct);
router.delete('/admin/products/:id', verifyToken, verifyAdmin, adminProductController.deleteProduct);

// --- 訂單管理 (Logistics) ---
router.get('/admin/orders', verifyToken, verifyAdmin, adminOrderController.getAdminOrders);
router.patch('/admin/orders/:id/status', verifyToken, verifyAdmin, adminOrderController.updateOrderStatus);

// --- 文章管理 (Library) ---
router.post('/admin/articles', verifyToken, verifyAdmin, adminLibraryController.createArticle);
router.put('/admin/articles/:id', verifyToken, verifyAdmin, adminLibraryController.updateArticle);
router.delete('/admin/articles/:id', verifyToken, verifyAdmin, adminLibraryController.deleteArticle);

// --- 任務管理 (Quest) ---
router.post('/admin/quests', verifyToken, verifyAdmin, adminQuestController.createQuest);
router.put('/admin/quests/:id', verifyToken, verifyAdmin, adminQuestController.updateQuest);
router.delete('/admin/quests/:id', verifyToken, verifyAdmin, adminQuestController.deleteQuest);

module.exports = router;