const express = require('express');
const router = express.Router();

// --- 1. 引入所有控制器 ---
const clientController = require('../controllers/clientProduct.controller');
const authController = require('../controllers/adminAuth.controller');
const adminProductController = require('../controllers/adminProduct.controller');
const addressController = require('../controllers/address.controller');
const guildController = require('../controllers/guild.controller'); 

// --- 2. 引入 Middleware ---
const verifyToken = require('../middleware/authMiddleware');

// ==============================
// 客戶端產品 (Public)
// ==============================
router.get('/products/all', clientController.getAllProducts);
router.get('/products', clientController.getProducts);
router.get('/product/:id', clientController.getProductById);

// ==============================
// 身份驗證 (Auth)
// ==============================
router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.post('/auth/refresh', authController.refreshToken);
router.post('/auth/password/forgot', authController.forgotPassword);
router.post('/auth/password/reset', authController.resetPassword);

// ==============================
// 公會會員 (Guild Member) - 需要 Token
// ==============================
// 基本資料
router.get('/guild/profile', verifyToken, authController.getProfile);
router.put('/guild/profile', verifyToken, authController.updateProfile);

// 地址管理 (Address Book)
router.get('/guild/addresses', verifyToken, addressController.getAddresses);
router.post('/guild/addresses', verifyToken, addressController.addAddress);
router.delete('/guild/addresses/:id', verifyToken, addressController.deleteAddress);

// 進階功能 (由 guildController 處理)
router.put('/guild/password', verifyToken, guildController.changePassword); 
router.delete('/guild/account', verifyToken, guildController.deleteAccount); 
router.get('/guild/orders', verifyToken, guildController.getOrders); 
router.get('/guild/inventory', verifyToken, guildController.getInventory); 
router.post('/guild/checkout', verifyToken, guildController.checkout); 

// ==============================
// 🛡️ 管理員後台 (Admin)
// ==============================
router.post('/admin/product', verifyToken, adminProductController.createProduct);

module.exports = router;