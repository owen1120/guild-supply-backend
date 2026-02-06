// src/services/storageService.js
const { Storage } = require('@google-cloud/storage');
require('dotenv').config(); // 讀取環境變數

// 初始化 Storage
// 注意：在本地開發時，你需要設定 Google 憑證 (稍後說明)
// 在 Cloud Run 上，它會自動使用服務帳號，不需要額外設定
const storage = new Storage();

const BUCKET_NAME = 'guild-supply-hwcc0321'; // 你的 Bucket 名稱
const FILE_NAME = 'data.json';

/**
 * 從 GCS 讀取完整資料
 * @returns {Promise<Array>} 產品列表
 */
const readData = async () => {
  try {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_NAME);
    
    // 下載檔案
    const [contents] = await file.download();
    const jsonData = JSON.parse(contents.toString());
    
    // 假設 data.json 是一個陣列，或者結構是 { products: [...] }
    // 這裡做一個防呆，確保回傳的是陣列
    if (Array.isArray(jsonData)) {
      return jsonData;
    } else if (jsonData.products) {
      return jsonData.products;
    }
    return [];
  } catch (error) {
    console.error('GCS 讀取錯誤:', error);
    throw new Error('無法讀取資料庫'); // 拋出錯誤給 Controller 處理
  }
};

module.exports = { readData };