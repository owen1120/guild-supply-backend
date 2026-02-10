// src/controllers/clientProduct.controller.js
const { readData } = require('../services/storageService');

// --- 資料轉換器 (Data Mapper) ---
// 負責將複雜的資料庫結構 (SSR 裝備) 轉換成前端易讀的格式
const sanitizeProduct = (rawProduct) => {
  // 1. 處理圖片：找出主要圖片 (is_primary: true)
  const primaryImage = rawProduct.media?.images?.find(img => img.is_primary)?.url 
    || rawProduct.media?.images?.[0]?.url 
    || "";

  // 2. 處理所有圖片陣列 (給產品內頁輪播用)
  const imagesUrl = rawProduct.media?.images?.map(img => img.url) || [];

  return {
    id: rawProduct.id,
    
    // 對應 JSON 的 basic_info.name
    title: rawProduct.basic_info?.name || "未命名產品",
    
    // 對應 JSON 的 basic_info.brand 或 rpg_tuning.tags
    category: rawProduct.basic_info?.brand || "Guild Supply",
    
    // 對應 JSON 的 pricing.base_price
    price: rawProduct.pricing?.base_price || 0,
    
    // 原價 (如果有折扣邏輯可以在這裡擴充，目前先用 base_price)
    origin_price: rawProduct.pricing?.base_price || 0, 

    // 單位 (你的 JSON 沒有 unit 欄位，這裡暫時給預設值，或者你可以從 inventory 判斷)
    unit: "件", 
    
    // 描述
    description: rawProduct.basic_info?.description_html || "",
    content: rawProduct.basic_info?.description_html || "",
    
    // 圖片
    imageUrl: primaryImage,
    imagesUrl: imagesUrl,

    // 庫存 (從 inventory 拿)
    num: rawProduct.inventory?.stock_quantity || 0,

    // RPG 屬性 (這是你獨有的特色，我建議加上去)
    rarity: rawProduct.rpg_tuning?.rarity || "N",
    stats: rawProduct.rpg_tuning?.stats || {}
  };
};

// 1. 取得所有產品 (無分頁)
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await readData();
    
    // 🔍 過濾器修正：使用 'is_published'
    const activeProducts = allProducts.filter(p => p.is_published === true);
    
    // 資料清洗
    const cleanProducts = activeProducts.map(sanitizeProduct);
    
    res.status(200).json({
      success: true,
      products: cleanProducts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "資料讀取失敗" });
  }
};

// 2. 取得產品列表 (有分頁)
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    
    const allProducts = await readData();
    
    // 🔍 過濾器修正：使用 'is_published'
    const activeProducts = allProducts.filter(p => p.is_published === true);
    
    // 分頁邏輯
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
        category: "" 
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "資料讀取失敗" });
  }
};

// 3. 取得單一產品
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
    res.status(500).json({ success: false, message: "資料讀取失敗" });
  }
};

module.exports = { getAllProducts, getProducts, getProductById };