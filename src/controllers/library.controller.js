const prisma = require('../utils/prisma');

// ==============================
// 1. The Archives (瀏覽所有卷軸)
// ==============================
const getScrolls = async (req, res) => {
  try {
    const { category, tag } = req.query;

    const where = { isPublished: true };
    if (category) where.category = category;
    if (tag) where.rpgMetadata = { path: ['tags'], array_contains: tag }; 

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        subtitle: true,
        category: true,
        coverImage: true,
        rpgMetadata: true, 
        createdAt: true,
        likes: true,
        views: true
      }
    });

    const formatted = articles.map(art => ({
        guide_id: art.id,
        slug: art.slug,
        title: art.title,
        subtitle: art.subtitle,
        category: art.category,
        cover_image_url: art.coverImage,
        rpg_metadata: art.rpgMetadata || {},
        social: { mana_likes: art.likes, views: art.views },
        published_at: art.createdAt
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取圖書館目錄' });
  }
};

// ==============================
// 2. Read Scroll (閱讀卷軸詳情)
// ==============================
const getScrollById = async (req, res) => {
  try {
    const { id } = req.params; 

    let article = await prisma.article.findUnique({ where: { slug: id } });
    
    if (!article) {
        try {
            article = await prisma.article.findUnique({ where: { id } });
        } catch (e) {
        }
    }

    if (!article || !article.isPublished) {
        return res.status(404).json({ success: false, message: '找不到該卷軸或已被封存' });
    }

    prisma.article.update({
        where: { id: article.id },
        data: { views: { increment: 1 } }
    }).catch(() => {});

    const responseData = {
        guide_id: article.id,
        slug: article.slug,
        is_published: article.isPublished,
        created_at: article.createdAt,
        updated_at: article.updatedAt,

        header_info: {
            title: article.title,
            subtitle: article.subtitle,
            category: article.category,
            cover_image_url: article.coverImage,
            author: article.authorInfo || { name: "Guild Admin", rank_title: "Administrator" }
        },

        rpg_metadata: article.rpgMetadata || { 
            difficulty_level: "NORMAL", 
            quest_time_minutes: 5, 
            tags: [] 
        },

        content_body: article.contentBody || [],

        linked_equipment: article.linkedProducts || { items: [] },

        location_intel: article.location || {},

        social_engagement: {
            mana_likes: article.likes,
            views_count: article.views,
            share_count: 0,
            comments_count: 0
        }
    };

    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    res.status(500).json({ success: false, message: '讀取卷軸失敗: ' + error.message });
  }
};

// ==============================
// 3. Like Scroll (給予 Mana 讚賞)
// ==============================
const likeScroll = async (req, res) => {
  try {
    const { id } = req.params; 
    
    let article = await prisma.article.findUnique({ where: { slug: id } });
    if (!article) article = await prisma.article.findUnique({ where: { id } });
    if (!article) return res.status(404).json({ success: false, message: '找不到該卷軸' });

    const updated = await prisma.article.update({
      where: { id: article.id },
      data: { likes: { increment: 1 } }
    });

    res.status(200).json({ success: true, message: 'Mana 注入成功', likes: updated.likes });
  } catch (error) {
    res.status(500).json({ success: false, message: '按讚失敗' });
  }
};

// ==============================
// 4. Categories (取得分類列表)
// ==============================
const getCategories = async (req, res) => {
  try {
    const categories = [
        { key: 'SKILL_MANUAL', label: 'Survival Skills' },
        { key: 'ROUTE_INTEL', label: 'Map & Routes' },
        { key: 'GEAR_REVIEW', label: 'Equipment Analysis' },
        { key: 'LORE', label: 'World Lore' }
    ];
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取分類' });
  }
};

module.exports = { getScrolls, getScrollById, likeScroll, getCategories };