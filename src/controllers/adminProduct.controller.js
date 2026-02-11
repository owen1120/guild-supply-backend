const prisma = require('../utils/prisma');

const createProduct = async (req, res) => {
  try {
    const { title, category, price, images, description, tags } = req.body;

    if (!title || !price) {
      return res.status(400).json({ success: false, message: '標題與價格為必填欄位' });
    }

    const newProduct = await prisma.product.create({
      data: {
        title: title,
        category: category || 'Uncategorized',
        price: parseInt(price),
        images: images || [],
        details: {
          description: description || '',
          tags: tags || [],
          specs: req.body.specs || {}
        }
      }
    });

    res.status(201).json({
      success: true,
      message: '產品新增成功！',
      product: newProduct
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '新增失敗：' + error.message });
  }
};

module.exports = { createProduct };