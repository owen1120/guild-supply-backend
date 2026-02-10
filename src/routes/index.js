const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientProduct.controller');
const authController = require('../controllers/adminAuth.controller'); 

// --- 客戶端產品 API (Client) ---
router.get('/products/all', clientController.getAllProducts);
router.get('/products', clientController.getProducts);
router.get('/product/:id', clientController.getProductById);

// --- 管理員認證 API (Admin Auth) ---
// 登入
router.post('/admin/signin', authController.signin);

// 檢查登入狀態
router.post('/admin/check', authController.checkAuth);

// 登出
router.post('/admin/logout', authController.logout);

module.exports = router;