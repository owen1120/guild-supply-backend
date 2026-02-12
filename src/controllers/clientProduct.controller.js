const prisma = require('../utils/prisma');

// 1. Item Types (取得所有商品分類)
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.product.findMany({
      where: { is_published: true },
      distinct: ['category'],
      select: { category: true }
    });

    const categoryList = categories.map(c => c.category);
    
    res.status(200).json({ success: true, data: categoryList });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取分類' });
  }
};

// 2. Guild Picks (首頁精選/最新商品)
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { is_published: true },
      take: 4, 
      orderBy: { createdAt: 'desc' } 
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取精選商品' });
  }
};

// 3. Scan Loot (搜尋、篩選、分頁)
const getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      keyword, 
      category, 
      minPrice, 
      maxPrice, 
      sort 
    } = req.query;

    // 計算分頁
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // 建立搜尋條件
    const where = { is_published: true };

    if (keyword) {
      where.title = { contains: keyword, mode: 'insensitive' };
    }
    if (category) {
      where.category = category;
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseInt(minPrice);
      if (maxPrice) where.price.lte = parseInt(maxPrice);
    }

    // 建立排序
    let orderBy = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };

    // 執行查詢 (同時查資料 + 總數)
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy
      }),
      prisma.product.count({ where })
    ]);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: '搜尋失敗' });
  }
};

// 4. Analyze Artifact (單一商品詳情)
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: id }
    });

    if (!product) {
      return res.status(404).json({ success: false, message: '找不到此商品' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: '讀取詳情失敗' });
  }
};

module.exports = {
  getCategories,
  getFeaturedProducts,
  getProducts,
  getProductById
};