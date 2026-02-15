const prisma = require('../utils/prisma');

// 1. Item Types (取得所有商品分類)
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.product.findMany({
      where: { isPublished: true }, 
      distinct: ['category'],
      select: { category: true }
    });

    const categoryList = categories.map(c => c.category);
    
    res.status(200).json({ success: true, data: categoryList });
  } catch (error) {
    console.error('🔥 [getCategories] Error:', error); 
    res.status(500).json({ success: false, message: '無法讀取分類', error: error.message });
  }
};

// 2. Guild Picks (首頁精選/最新商品)
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true }, 
      take: 4, 
      orderBy: { createdAt: 'desc' } 
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('🔥 [getFeaturedProducts] Error:', error);
    res.status(500).json({ success: false, message: '無法讀取精選商品', error: error.message });
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
      sort,
      rarity, 
      minDef, maxDef, 
      minAgi, maxAgi, 
      minRes, maxRes 
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = {
      isPublished: true, 
    };

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } }
      ];
    }

    if (category && category !== 'All') {
      where.category = category;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseInt(minPrice);
      if (maxPrice) where.price.lte = parseInt(maxPrice);
    }

    if (rarity) {
      const rarityList = rarity.split(','); 
      where.rarity = { in: rarityList };
    }

    if (minDef || maxDef) {
      where.def = {};
      if (minDef) where.def.gte = parseInt(minDef);
      if (maxDef) where.def.lte = parseInt(maxDef);
    }
    if (minAgi || maxAgi) {
      where.agi = {};
      if (minAgi) where.agi.gte = parseInt(minAgi);
      if (maxAgi) where.agi.lte = parseInt(maxAgi);
    }
    if (minRes || maxRes) {
      where.res = {};
      if (minRes) where.res.gte = parseInt(minRes);
      if (maxRes) where.res.lte = parseInt(maxRes);
    }

    let orderBy = { createdAt: 'desc' }; 

    switch (sort) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'name_asc': 
        orderBy = { title: 'asc' };
        break;
      case 'name_desc': 
        orderBy = { title: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        take: limitNum,
        skip: skip,
        orderBy,
      })
    ]);

    res.status(200).json({
      success: true,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      },
      data: products
    });

  } catch (error) {
    console.error('🔥 取得商品列表失敗:', error);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
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
    console.error('🔥 [getProductById] Error:', error);
    res.status(500).json({ success: false, message: '讀取詳情失敗', error: error.message });
  }
};

module.exports = {
  getCategories,
  getFeaturedProducts,
  getProducts,
  getProductById
};