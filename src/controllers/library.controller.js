const prisma = require('../utils/prisma');

// ==========================================
// 1. 取得文章分類 (Categories)
// ==========================================
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.article.findMany({
      where: { isPublished: true },
      select: { category: true },
      distinct: ['category']
    });

    const categoryList = categories.map(c => c.category);
    res.status(200).json({ success: true, data: categoryList });
  } catch (error) {
    res.status(500).json({ success: false, message: '讀取分類失敗: ' + error.message });
  }
};

// ==========================================
// 2. 取得文章列表 (Scrolls)
// ==========================================
const getScrolls = async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    const skip = (Math.max(1, page) - 1) * limit;

    const whereCondition = { isPublished: true };
    if (category) {
      whereCondition.category = category;
    }

    const [total, articles] = await Promise.all([
      prisma.article.count({ where: whereCondition }),
      prisma.article.findMany({
        where: whereCondition,
        select: {
          id: true,
          slug: true,
          title: true,
          subtitle: true,
          category: true,
          coverImage: true,
          views: true,
          likes: true,
          createdAt: true,
          authorInfo: true
        },
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        skip: parseInt(skip)
      })
    ]);

    const formattedData = articles.map(article => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      subtitle: article.subtitle,
      category: article.category,
      cover_image: article.coverImage,
      views: article.views,
      likes: article.likes,
      created_at: article.createdAt,
      
      author_info: article.authorInfo ? {
        name: article.authorInfo.name,
        rank_title: article.authorInfo.rank_title,
        avatar_url: article.authorInfo.avatar_url
      } : null
    }));

    res.status(200).json({
      success: true,
      data: formattedData,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        total_pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: '讀取文章列表失敗: ' + error.message });
  }
};

// ==========================================
// 3. 取得單一文章詳細內容 (Scroll Detail)
// ==========================================
const getScrollById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
        isPublished: true
      }
    });

    if (!article) {
      return res.status(404).json({ success: false, message: '找不到該卷軸文獻' });
    }

    prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } }
    }).catch(err => console.error('更新閱覽數失敗:', err));

    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: '讀取文章內容失敗: ' + error.message });
  }
};

// ==========================================
// 4. 按讚 / 取消按讚 (Like Scroll)
// ==========================================
const likeScroll = async (req, res) => {
  try {
    const { id } = req.params;
    
    const article = await prisma.article.findFirst({
      where: { OR: [{ id: id }, { slug: id }] }
    });

    if (!article) {
      return res.status(404).json({ success: false, message: '找不到該卷軸文獻' });
    }

    const updatedArticle = await prisma.article.update({
      where: { id: article.id },
      data: { likes: { increment: 1 } }
    });

    res.status(200).json({ 
      success: true, 
      message: '已注入魔力 (按讚成功)',
      likes: updatedArticle.likes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '施法失敗: ' + error.message });
  }
};

module.exports = {
  getCategories,
  getScrolls,
  getScrollById,
  likeScroll
};