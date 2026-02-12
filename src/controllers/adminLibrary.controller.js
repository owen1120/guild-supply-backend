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
// 1. Scribe Scroll (撰寫新文章)
// ==============================
const createArticle = async (req, res) => {
  try {
    const { title, content, category, tags, thumbnail, isPublished, slug } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: '標題與內容為必填' });
    }

    let finalSlug = slug || generateSlug(title);
    
    const existingSlug = await prisma.article.findUnique({ where: { slug: finalSlug } });
    if (existingSlug) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
        category: category || 'General',
        tags: tags || [],
        thumbnail: thumbnail || '',
        isPublished: isPublished !== undefined ? isPublished : true,
        slug: finalSlug
      }
    });

    res.status(201).json({ success: true, message: '卷軸撰寫完成 (發布成功)', data: newArticle });
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
    const { title, content, category, tags, thumbnail, isPublished, slug } = req.body;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
        return res.status(404).json({ success: false, message: '找不到該卷軸' });
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
        category,
        tags,
        thumbnail,
        isPublished,
        slug 
      }
    });

    res.status(200).json({ success: true, message: '卷軸內容已修訂', data: updatedArticle });
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

    await prisma.article.delete({
      where: { id }
    });

    res.status(200).json({ success: true, message: '卷軸已燒毀 (刪除成功)' });
  } catch (error) {
    res.status(500).json({ success: false, message: '刪除失敗: ' + error.message });
  }
};

module.exports = { createArticle, updateArticle, deleteArticle };