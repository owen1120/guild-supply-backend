const prisma = require('../utils/prisma');

const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// ==============================
// 1. Scribe Scroll (撰寫新文章 - 支援冒險指南 JSON)
// ==============================
const createArticle = async (req, res) => {
  try {
    const { 
        slug,
        is_published,
        header_info,
        rpg_metadata,
        content_body,
        linked_equipment,
        location_intel
    } = req.body;

    if (!header_info?.title) {
      return res.status(400).json({ success: false, message: '標題 (header_info.title) 為必填' });
    }

    let finalSlug = slug || generateSlug(header_info.title);
    
    const existingSlug = await prisma.article.findUnique({ where: { slug: finalSlug } });
    if (existingSlug) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newArticle = await prisma.article.create({
      data: {
        slug: finalSlug,
        isPublished: is_published !== undefined ? is_published : true,
        
        title: header_info.title,
        category: header_info.category || 'GENERAL',
        
        subtitle: header_info.subtitle || '',
        coverImage: header_info.cover_image_url || '',
        authorInfo: header_info.author || {}, 
        
        rpgMetadata: rpg_metadata || {},
        contentBody: content_body || [],
        linkedProducts: linked_equipment || {},
        location: location_intel || {}
      }
    });

    res.status(201).json({ success: true, message: '冒險指南已撰寫 (發布成功)', data: newArticle });
  } catch (error) {
    if (error.code === 'P2002') {
        return res.status(400).json({ success: false, message: '網址名稱 (Slug) 已被使用，請更換' });
    }
    res.status(500).json({ success: false, message: '撰寫失敗: ' + error.message });
  }
};

// ==============================
// 2. Rewrite Scroll (修改文章)
// ==============================
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
        slug, is_published, header_info, rpg_metadata, 
        content_body, linked_equipment, location_intel 
    } = req.body;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: '找不到該卷軸' });

    const dataToUpdate = {};
    
    if (slug) dataToUpdate.slug = slug;
    if (is_published !== undefined) dataToUpdate.isPublished = is_published;
    
    if (header_info) {
        if (header_info.title) dataToUpdate.title = header_info.title;
        if (header_info.category) dataToUpdate.category = header_info.category;
        if (header_info.subtitle !== undefined) dataToUpdate.subtitle = header_info.subtitle;
        if (header_info.cover_image_url !== undefined) dataToUpdate.coverImage = header_info.cover_image_url;
        if (header_info.author) dataToUpdate.authorInfo = header_info.author;
    }

    if (rpg_metadata) dataToUpdate.rpgMetadata = rpg_metadata;
    if (content_body) dataToUpdate.contentBody = content_body;
    if (linked_equipment) dataToUpdate.linkedProducts = linked_equipment;
    if (location_intel) dataToUpdate.location = location_intel;

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: dataToUpdate
    });

    res.status(200).json({ success: true, message: '指南內容已修訂', data: updatedArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: '修訂失敗: ' + error.message });
  }
};

// ==============================
// 3. Burn Scroll (刪除文章)
// ==============================
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.article.delete({ where: { id } });
    res.status(200).json({ success: true, message: '卷軸已燒毀 (刪除成功)' });
  } catch (error) {
    res.status(500).json({ success: false, message: '刪除失敗: ' + error.message });
  }
};

module.exports = { createArticle, updateArticle, deleteArticle };