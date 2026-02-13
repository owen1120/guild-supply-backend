const express = require('express');
const router = express.Router();

// --- 1. 引入所有控制器 (Controllers) ---
const clientController = require('../controllers/clientProduct.controller');
const authController = require('../controllers/auth.controller'); 
const adminProductController = require('../controllers/adminProduct.controller');
const addressController = require('../controllers/address.controller');
const guildController = require('../controllers/guild.controller');
const questController = require('../controllers/quest.controller');
const cartController = require('../controllers/cart.controller');
const orderController = require('../controllers/order.controller');
const libraryController = require('../controllers/library.controller');

// --- 引入後台專用控制器 ---
const adminOrderController = require('../controllers/adminOrder.controller');
const adminLibraryController = require('../controllers/adminLibrary.controller');
const adminQuestController = require('../controllers/adminQuest.controller');

// --- 2. 引入 Middleware ---
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// ==============================
// 🛒 1. Armory: 客戶端產品 (Public)
// ==============================
router.get('/products/categories', (req, res, next) => {
    // #swagger.tags = ['Products (商品)']
    // #swagger.summary = '取得所有商品分類'
    next();
}, clientController.getCategories);

router.get('/products/featured', (req, res, next) => {
    // #swagger.tags = ['Products (商品)']
    // #swagger.summary = '取得精選/最新商品'
    next();
}, clientController.getFeaturedProducts);

router.get('/products', (req, res, next) => {
    // #swagger.tags = ['Products (商品)']
    // #swagger.summary = '搜尋與篩選商品'
    /* #swagger.parameters['page'] = { description: '頁碼', type: 'integer' }
        #swagger.parameters['keyword'] = { description: '關鍵字搜尋' } 
        #swagger.parameters['category'] = { description: '分類篩選' } */
    next();
}, clientController.getProducts);

router.get('/products/:id', (req, res, next) => {
    // #swagger.tags = ['Products (商品)']
    // #swagger.summary = '取得單一商品詳情'
    next();
}, clientController.getProductById);


// ==============================
// 🔐 2. Auth: 身份驗證
// ==============================
router.post('/auth/signup', (req, res, next) => {
    // #swagger.tags = ['Authentication (認證)']
    // #swagger.summary = '註冊新帳號'
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: '註冊資料',
        schema: { $email: 'user@test.com', $password: '123456', $codename: 'Hero' }
    } */
    next();
}, authController.signup);

router.post('/auth/login', (req, res, next) => {
    // #swagger.tags = ['Authentication (認證)']
    // #swagger.summary = '會員登入'
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: '登入資料',
        schema: { $email: 'user@test.com', $password: '123456' }
    } */
    next();
}, authController.login);

router.post('/auth/logout', (req, res, next) => {
    // #swagger.tags = ['Authentication (認證)']
    // #swagger.summary = '登出'
    next();
}, authController.logout);

router.post('/auth/refresh', (req, res, next) => {
    // #swagger.tags = ['Authentication (認證)']
    // #swagger.summary = '刷新 Token'
    next();
}, authController.refreshToken);

router.post('/auth/password/forgot', (req, res, next) => {
    // #swagger.tags = ['Authentication (認證)']
    // #swagger.summary = '忘記密碼'
    next();
}, authController.forgotPassword);

router.post('/auth/password/reset', (req, res, next) => {
    // #swagger.tags = ['Authentication (認證)']
    // #swagger.summary = '重設密碼'
    next();
}, authController.resetPassword);


// ==============================
// 🏰 3. Guild: 公會會員中心 (需 Token)
// ==============================
// --- 基本資料 ---
router.get('/guild/profile', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '取得個人檔案'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, authController.getProfile);

router.put('/guild/profile', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '更新個人檔案'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, authController.updateProfile);

// --- 地址管理 ---
router.get('/guild/addresses', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '取得地址列表'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, addressController.getAddresses);

router.post('/guild/addresses', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '新增地址'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, addressController.addAddress);

router.delete('/guild/addresses/:id', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '刪除地址'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, addressController.deleteAddress);

// --- 帳號與交易 ---
router.put('/guild/password', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '修改密碼'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.changePassword);

router.delete('/guild/account', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '刪除帳號 (軟刪除)'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.deleteAccount);

router.get('/guild/orders', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '查詢我的訂單'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.getOrders);

router.get('/guild/orders/:id', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '查詢訂單詳情 (Snapshot)'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.getOrderById);

router.get('/guild/inventory', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '查詢我的庫存 (已購商品)'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.getInventory);

// --- 遊戲化 ---
router.get('/guild/wallet', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '查詢錢包餘額'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.getWallet);

router.get('/guild/achievements', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '查詢成就列表'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.getAchievements);

router.get('/guild/quests', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '查詢我的任務進度'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, questController.getMyQuests);

// --- 收藏與願望清單 ---
router.get('/guild/bookmarks', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '查詢文章收藏'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.getBookmarks);

router.post('/guild/bookmarks', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '新增文章收藏'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.addBookmark);

router.delete('/guild/bookmarks/:id', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '移除文章收藏'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.removeBookmark);

router.get('/guild/wishlist', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '查詢願望清單'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.getWishlist);

router.post('/guild/wishlist', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '加入願望清單'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.addToWishlist);

router.delete('/guild/wishlist/:id', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Guild (公會中心)']
    // #swagger.summary = '移除願望清單'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, guildController.removeFromWishlist);


// ==============================
// 📜 4. Quest: 任務系統 (需 Token)
// ==============================
router.get('/quests', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Quests (任務)']
    // #swagger.summary = '取得所有可接任務'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, questController.getQuests);

router.post('/quests/:id/accept', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Quests (任務)']
    // #swagger.summary = '接受任務'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, questController.acceptQuest);

router.post('/quests/:id/claim', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Quests (任務)']
    // #swagger.summary = '領取任務獎勵'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, questController.claimReward);

router.post('/quests/:id/progress', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Quests (任務)']
    // #swagger.summary = '更新任務進度 (Debug用)'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, questController.debugProgress);


// ==============================
// 🚚 5. Logistics: 購物車與結帳 (需 Token)
// ==============================
router.get('/cart', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Cart & Order (購物車與下單)']
    // #swagger.summary = '取得購物車內容'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, cartController.getCart);

router.post('/cart', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Cart & Order (購物車與下單)']
    // #swagger.summary = '加入購物車'
    // #swagger.security = [{ "bearerAuth": [] }]
    /* #swagger.parameters['body'] = {
        in: 'body',
        schema: { $productId: 'PROD_001', $quantity: 1 }
    } */
    next();
}, cartController.addToCart);

router.patch('/cart/:itemId', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Cart & Order (購物車與下單)']
    // #swagger.summary = '更新購物車數量'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, cartController.updateCartItem);

router.delete('/cart/:itemId', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Cart & Order (購物車與下單)']
    // #swagger.summary = '移除購物車項目'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, cartController.removeCartItem);

router.delete('/cart', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Cart & Order (購物車與下單)']
    // #swagger.summary = '清空購物車'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, cartController.clearCart);

router.post('/orders/preview', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Cart & Order (購物車與下單)']
    // #swagger.summary = '預覽訂單 (計算運費與總額)'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, orderController.previewOrder);

router.post('/orders', verifyToken, (req, res, next) => {
    // #swagger.tags = ['Cart & Order (購物車與下單)']
    // #swagger.summary = '正式建立訂單'
    // #swagger.security = [{ "bearerAuth": [] }]
    /* #swagger.parameters['body'] = {
        in: 'body',
        schema: { 
            items: [{ productId: 'PROD_001', quantity: 1 }],
            shippingAddressId: 'ADDR_001'
        }
    } */
    next();
}, orderController.createOrder);


// ==============================
// 📚 6. The Library: 知識庫 (Public)
// ==============================
router.get('/library/categories', (req, res, next) => {
    // #swagger.tags = ['Library (圖書館)']
    // #swagger.summary = '取得文章分類'
    next();
}, libraryController.getCategories);

router.get('/library/scrolls', (req, res, next) => {
    // #swagger.tags = ['Library (圖書館)']
    // #swagger.summary = '取得文章列表'
    next();
}, libraryController.getScrolls);

router.get('/library/scrolls/:id', (req, res, next) => {
    // #swagger.tags = ['Library (圖書館)']
    // #swagger.summary = '取得文章內容'
    next();
}, libraryController.getScrollById);

router.post('/library/scrolls/:id/like', (req, res, next) => {
    // #swagger.tags = ['Library (圖書館)']
    // #swagger.summary = '按讚/取消按讚'
    next();
}, libraryController.likeScroll);


// ==============================
// 🛡️ 7. Admin: 公會長辦公室 (需 Token + Admin權限)
// ==============================
// --- 商品 ---
router.get('/admin/products', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 取得商品列表'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminProductController.getAdminProducts);

router.post('/admin/products', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 建立新商品'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminProductController.createProduct);

router.put('/admin/products/:id', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 更新商品'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminProductController.updateProduct);

router.delete('/admin/products/:id', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 刪除商品'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminProductController.deleteProduct);

// --- 訂單 ---
router.get('/admin/orders', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 取得所有訂單'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminOrderController.getAdminOrders);

router.patch('/admin/orders/:id/status', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 更新訂單狀態'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminOrderController.updateOrderStatus);

// --- 文章 ---
router.post('/admin/articles', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 發布新文章'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminLibraryController.createArticle);

router.put('/admin/articles/:id', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 編輯文章'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminLibraryController.updateArticle);

router.delete('/admin/articles/:id', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 刪除文章'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminLibraryController.deleteArticle);

// --- 任務 ---
router.post('/admin/quests', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 發布新任務'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminQuestController.createQuest);

router.put('/admin/quests/:id', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 編輯任務'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminQuestController.updateQuest);

router.delete('/admin/quests/:id', verifyToken, verifyAdmin, (req, res, next) => {
    // #swagger.tags = ['Admin Dashboard (後台管理)']
    // #swagger.summary = '[後台] 刪除任務'
    // #swagger.security = [{ "bearerAuth": [] }]
    next();
}, adminQuestController.deleteQuest);

module.exports = router;