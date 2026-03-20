const prisma = require('../utils/prisma');

const getFaqs = async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' }
    });

    res.status(200).json({
      success: true,
      data: faqs
    });
  } catch (error) {
    console.error('取得 FAQ 失敗:', error);
    res.status(500).json({ success: false, message: '讀取公會佈告欄失敗: ' + error.message });
  }
};

module.exports = {
  getFaqs
};