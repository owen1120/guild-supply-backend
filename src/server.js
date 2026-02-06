// src/server.js
const express = require('express');
const cors = require('cors');
const functions = require('@google-cloud/functions-framework');
const dotenv = require('dotenv');

// 載入環境變數
dotenv.config();

const app = express();

// --- 1. 設定 CORS (比你原本的手寫判斷更安全且標準) ---
const allowedOrigins = [
  'https://www.hwcc0321.com', 
  'https://hwcc0321.com',
  'https://owen1120.github.io',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // 允許沒有 origin 的請求 (例如 Postman 或 Server-to-Server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: This origin is not allowed'), false);
    }
    return callback(null, true);
  }
}));

// 解析 JSON body (為了之後的 POST/PUT 準備)
app.use(express.json());

// --- 2. 路由設定 ---
const clientController = require('./controllers/clientProduct.controller');

// 定義路由群組
const router = express.Router();

// 客戶端 API
// 注意路徑參數 :api_path，雖然你目前可能沒用到，但為了符合圖片規格我們先保留
router.get('/:api_path/products/all', clientController.getAllProducts);
router.get('/:api_path/products', clientController.getProducts);
router.get('/:api_path/product/:id', clientController.getProductById);

app.use('/guild-supply', router);

// --- 3. 錯誤處理 ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: '系統發生預期外的錯誤' });
});

// --- 4. 輸出給 Google Cloud Functions ---
// 這是關鍵：Cloud Functions 需要 export 一個函式
exports.getApiData = app;

// --- 5. 本地開發啟動 ---
// 當直接執行 node src/server.js 時，會在本地 3000 port 啟動
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`(推了推眼鏡) 本地伺服器已啟動: http://localhost:${PORT}`);
    console.log(`嘗試存取: http://localhost:${PORT}/v2/api/test_path/products`);
  });
}