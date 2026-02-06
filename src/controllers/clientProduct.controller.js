// src/controllers/clientProduct.controller.js
const { readData } = require('../services/storageService');

// 欄位過濾器：只留下給客戶看的資料
const sanitizeProduct = (product) => {
  return {
    id: product.id,
    title: product.title,
    category: product.category,
    imageUrl: product.imageUrl, // 確保欄位名稱跟你的 JSON 一致
    imagesUrl: product.imagesUrl,
    description: product.description,
    content: product.content,
    price: product.price,
    unit: product.unit,
    // 絕對不回傳: origin_price, is_enabled 等後台欄位
  };
};

// 1. 取得所有產品 (無分頁，對應 /products/all)
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await readData();
    // 只回傳啟用的產品
    const activeProducts = allProducts.filter(p => p.is_enabled === 1 || p.is_enabled === true);
    // 資料清洗
    const cleanProducts = activeProducts.map(sanitizeProduct);
    
    res.status(200).json({
      success: true,
      products: cleanProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. 取得產品列表 (有分頁，對應 /products)
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // 每頁顯示幾筆，可自行調整
    
    const allProducts = await readData();
    // 過濾啟用狀態
    const activeProducts = allProducts.filter(p => p.is_enabled === 1 || p.is_enabled === true);
    
    // 計算分頁
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = activeProducts.slice(startIndex, endIndex);
    
    // 資料清洗
    const cleanProducts = paginatedProducts.map(sanitizeProduct);

    res.status(200).json({
      success: true,
      products: cleanProducts,
      pagination: {
        total_pages: Math.ceil(activeProducts.length / limit),
        current_page: page,
        has_pre: page > 1,
        has_next: endIndex < activeProducts.length,
        category: "" // 如果你有做分類篩選，這裡要回傳
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. 取得單一產品 (對應 /product/:id)
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const allProducts = await readData();
    
    const product = allProducts.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({ success: false, message: "找不到該產品" });
    }

    res.status(200).json({
      success: true,
      product: sanitizeProduct(product)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllProducts, getProducts, getProductById };