const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma'); 

// ==============================
// 1. Verify Token (驗證登入狀態)
// ==============================
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success: false, message: '拒絕訪問：請出示冒險者證明 (無 Token)' });
  }

  try {
    const tokenString = token.replace('Bearer ', '');
    
    const verified = jwt.verify(tokenString, process.env.JWT_SECRET);
    
    req.user = verified;
    
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: '證明無效 (Token Error)' });
  }
};

// ==============================
// 2. Verify Admin (驗證管理員權限)
// ==============================
const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: '請先登入' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ success: false, message: '權限不足：此區域僅限公會長進入 (403 Forbidden)' });
    }

    next();

  } catch (error) {
    res.status(500).json({ success: false, message: '權限驗證錯誤' });
  }
};

module.exports = { verifyToken, verifyAdmin };