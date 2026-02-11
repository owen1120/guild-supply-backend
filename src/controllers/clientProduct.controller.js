const prisma = require('../utils/prisma');

const getProducts = async (req, res) => {
  try {
    const { category, keyword } = req.query;

    const where = {};
    
    if (category) {
      where.category = category;
    }

    if (keyword) {
      where.title = {
        contains: keyword,
        mode: 'insensitive', 
      };
    }

    where.is_published = true;

    const products = await prisma.product.findMany({
      where: where,
      orderBy: {
        createdAt: 'desc' 
      }
    });

    res.status(200).json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '伺服器錯誤 (讀取失敗)' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: id }
    });

    if (!product) {
      return res.status(404).json({ message: '找不到此商品' });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: '伺服器錯誤' });
    }
}

module.exports = {
  getProducts,
  getProductById,
  getAllProducts
};