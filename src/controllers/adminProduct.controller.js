const prisma = require('../utils/prisma');

// ==============================
// 1. Forge Weapon (上架新商品 - 支援複雜 JSON)
// ==============================
const createProduct = async (req, res) => {
  try {
    const { 
      basic_info, 
      pricing, 
      inventory, 
      rpg_tuning, 
      media, 
      pre_order, 
      seo, 
      is_published,
      category 
    } = req.body;

    if (!basic_info?.name || !pricing?.base_price) {
      return res.status(400).json({ success: false, message: '商品名稱(name)與基礎價格(base_price)為必填' });
    }

    const newProduct = await prisma.product.create({
      data: {
        title: basic_info.name,
        description: basic_info.description_html || '',
        brand: basic_info.brand || '',
        price: parseInt(pricing.base_price),
        stock: inventory?.stock_quantity ? parseInt(inventory.stock_quantity) : 0,
        sku: inventory?.sku || null,
        isPublished: is_published !== undefined ? is_published : true,
        category: category || 'Uncategorized',
        
        ribbons: basic_info.ribbons || [],
        
        options: basic_info.options || [],
        sections: basic_info.custom_sections || [],
        
        images: media?.images || [],
        videos: media?.videos || [],
        
        rpgDetails: rpg_tuning || {},
        
        pricingDetail: {
            is_special_offer: pricing.is_special_offer,
            discount: pricing.discount
        },
        
        preOrder: pre_order || {},
        seo: seo || {}
      }
    });

    res.status(201).json({ success: true, message: '傳說級裝備已鍛造完成 (上架成功)', data: newProduct });
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('sku')) {
        return res.status(400).json({ success: false, message: 'SKU 編號重複，請檢查庫存設定' });
    }
    res.status(500).json({ success: false, message: '上架失敗: ' + error.message });
  }
};

// ==============================
// 2. Inventory Check (後台列表)
// ==============================
const getAdminProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取庫存清單' });
  }
};

// ==============================
// 3. Reforge Weapon (編輯/更新商品)
// ==============================
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
        basic_info, pricing, inventory, rpg_tuning, media, 
        pre_order, seo, is_published, category 
    } = req.body;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: '找不到該商品' });

    const dataToUpdate = {};

    if (is_published !== undefined) dataToUpdate.isPublished = is_published;
    if (category) dataToUpdate.category = category;

    if (basic_info) {
        if (basic_info.name) dataToUpdate.title = basic_info.name;
        if (basic_info.description_html !== undefined) dataToUpdate.description = basic_info.description_html;
        if (basic_info.brand !== undefined) dataToUpdate.brand = basic_info.brand;
        if (basic_info.ribbons) dataToUpdate.ribbons = basic_info.ribbons;
        if (basic_info.options) dataToUpdate.options = basic_info.options;
        if (basic_info.custom_sections) dataToUpdate.sections = basic_info.custom_sections;
    }

    if (pricing) {
        if (pricing.base_price !== undefined) dataToUpdate.price = parseInt(pricing.base_price);
        dataToUpdate.pricingDetail = {
            is_special_offer: pricing.is_special_offer,
            discount: pricing.discount
        };
    }

    if (inventory) {
        if (inventory.stock_quantity !== undefined) dataToUpdate.stock = parseInt(inventory.stock_quantity);
        if (inventory.sku !== undefined) dataToUpdate.sku = inventory.sku;
    }

    if (rpg_tuning) dataToUpdate.rpgDetails = rpg_tuning;
    if (media) {
        if (media.images) dataToUpdate.images = media.images;
        if (media.videos) dataToUpdate.videos = media.videos;
    }
    if (pre_order) dataToUpdate.preOrder = pre_order;
    if (seo) dataToUpdate.seo = seo;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: dataToUpdate
    });

    res.status(200).json({ success: true, message: '裝備數值已重鑄 (更新成功)', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新失敗: ' + error.message });
  }
};

// ==============================
// 4. Smelt Weapon (刪除)
// ==============================
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.status(200).json({ success: true, message: '裝備已熔毀 (刪除成功)' });
  } catch (error) {
    res.status(500).json({ success: false, message: '刪除失敗: ' + error.message });
  }
};

module.exports = {
  createProduct,
  getAdminProducts,
  updateProduct,
  deleteProduct
};