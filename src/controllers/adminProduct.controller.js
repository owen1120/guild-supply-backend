const prisma = require('../utils/prisma');

// ==============================
// 1. Forge Weapon (上架新商品)
// ==============================
const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, images, is_published } = req.body;

    if (!title || !price) {
      return res.status(400).json({ success: false, message: '商品名稱與價格為必填' });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price: parseInt(price),
        category: category || 'Uncategorized',
        images: images || [], 
        is_published: is_published !== undefined ? is_published : true
      }
    });

    res.status(201).json({ success: true, message: '新裝備已鍛造完成 (上架成功)', data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: '上架失敗: ' + error.message });
  }
};

// ==============================
// 2. Inventory Check (後台商品列表)
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
    const { title, description, price, category, images, is_published } = req.body;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
        return res.status(404).json({ success: false, message: '找不到該商品' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price: price ? parseInt(price) : undefined,
        category,
        images,
        is_published
      }
    });

    res.status(200).json({ success: true, message: '裝備數值已調整 (更新成功)', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新失敗: ' + error.message });
  }
};

// ==============================
// 4. Smelt Weapon (刪除/下架商品)
// ==============================
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id }
    });

    res.status(200).json({ success: true, message: '裝備已熔毀 (刪除成功)' });
  } catch (error) {
    res.status(500).json({ success: false, message: '刪除失敗 (可能已有訂單關聯，建議改為下架): ' + error.message });
  }
};

module.exports = {
  createProduct,
  getAdminProducts,
  updateProduct,
  deleteProduct
};