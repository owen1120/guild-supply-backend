const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../utils/prisma');
require('dotenv').config();

// Open Gate (登入)
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: username }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: '找不到此冒險者 (帳號錯誤)' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '咒語錯誤 (密碼錯誤)' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: '大門已開啟 (登入成功)',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: 'Guild Master' 
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check License (取得個人資料)
const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, role: true, createdAt: true } 
    });

    if (!user) {
      return res.status(404).json({ success: false, message: '找不到冒險者檔案' });
    }

    res.status(200).json({
      success: true,
      message: '執照驗證通過',
      user: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Close Gate (登出)
const logout = async (req, res) => {
  res.status(200).json({ success: true, message: '大門已關閉 (登出成功)' });
};

module.exports = { login, getProfile, logout };