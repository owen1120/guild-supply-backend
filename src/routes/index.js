const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientProduct.controller');
const authController = require('../controllers/adminAuth.controller'); // 剛剛改的那支
const adminProductController = require('../controllers/adminProduct.controller');

const verifyToken = require('../middleware/authMiddleware');

// 客戶端產品 API (The Armory)
router.get('/products/all', clientController.getAllProducts);
router.get('/products', clientController.getProducts);
router.get('/product/:id', clientController.getProductById);

// 身份驗證 API (Auth Module)
// 登入 (Open Gate)
router.post('/auth/login', authController.login);

// 登出 (Close Gate)
router.post('/auth/logout', authController.logout);

// 會員 API (Guild Module)
// 取得個人資料 (Check License)
router.get('/guild/profile', verifyToken, authController.getProfile);

// 後台管理 API (需要權限)
router.post('/admin/product', verifyToken, adminProductController.createProduct);

module.exports = router;