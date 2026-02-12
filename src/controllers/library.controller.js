const prisma = require('../utils/prisma');

const getCategories = async (req, res) => {
  try {
    const categoriesGroup = await prisma.article.groupBy({
      by: ['category'],
      where: { isPublished: true },
      _count: { category: true }
    });

    const categories = categoriesGroup.map(c => c.category);

    const tags = ['新手', '進階', '火屬性', '傳說', '活動'];
    
    res.status(200).json({ 
        success: true, 
        data: { 
            categories: categories.length > 0 ? categories : ['Guide', 'Lore', 'News'], 
            tags 
        } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取智慧索引' });
  }
};

const getScrolls = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, keyword } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { isPublished: true };

    if (category) {
        where.category = category;
    }

    if (keyword) {
        where.OR = [
            { title: { contains: keyword, mode: 'insensitive' } },
            { summary: { contains: keyword, mode: 'insensitive' } }
        ];
    }

    const [articles, total] = await prisma.$transaction([
      prisma.article.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }, 
        select: { 
            id: true, 
            slug: true, 
            title: true, 
            summary: true, 
            thumbnail: true, 
            category: true, 
            tags: true, 
            likes: true, 
            views: true, 
            createdAt: true 
        }
      }),
      prisma.article.count({ where })
    ]);

    res.status(200).json({
      success: true,
      data: articles,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取卷軸列表: ' + error.message });
  }
};

const getScrollById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.update({
      where: { id: id },
      data: { views: { increment: 1 } },
      include: {
        products: {
            select: { id: true, title: true, price: true, images: true }
        }
      }
    });

    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(404).json({ success: false, message: '卷軸已遺失或不存在' });
  }
};


const likeScroll = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.update({
      where: { id: id },
      data: { likes: { increment: 1 } }
    });

    res.status(200).json({ 
        success: true, 
        message: '注入魔力成功', 
        likes: article.likes 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '操作失敗' });
  }
};

module.exports = { 
    getCategories, 
    getScrolls, 
    getScrollById, 
    likeScroll 
};