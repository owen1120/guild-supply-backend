const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../utils/prisma'); 
require('dotenv').config();

const signin = async (req, res) => {
  try {
    const { username, password } = req.body; 

    const user = await prisma.user.findUnique({
      where: { email: username }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: '找不到此帳號' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: '密碼錯誤' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // 回傳成功
    res.status(200).json({
      success: true,
      message: '登入成功',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
};

const checkAuth = async (req, res) => {
    res.status(200).json({ success: true, message: '驗證有效' });
};

const logout = async (req, res) => {
    res.status(200).json({ success: true, message: '已登出' });
};

module.exports = { signin, checkAuth, logout };