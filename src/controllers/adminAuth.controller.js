const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../utils/prisma');
const crypto = require('crypto'); 
const nodemailer = require('nodemailer'); 
require('dotenv').config();

// --- 輔助函式：模擬寄信 (開發階段用) ---
const sendMockEmail = async (email, resetUrl) => {
  console.log('=============================================');
  console.log(`📧 [模擬郵件] 寄給: ${email}`);
  console.log(`🔗 重設連結: ${resetUrl}`);
  console.log('=============================================');
};

// 1. Sign Contract (註冊)
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ success: false, message: '此 Email 已註冊' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, role: 'USER' } 
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ success: true, message: '註冊成功', token, user: { id: newUser.id, email: newUser.email, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Open Gate (登入)
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: username } });
    if (!user) return res.status(401).json({ success: false, message: '帳號錯誤' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: '密碼錯誤' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ success: true, message: '登入成功', token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Check License (取得個資)
const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, email: true, role: true } });
    if (!user) return res.status(404).json({ success: false, message: '找不到檔案' });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update Profile (修改個資)
const updateProfile = async (req, res) => {
  res.status(200).json({ success: true, message: '資料更新功能建置中' });
};

// 5. Close Gate (登出)
const logout = async (req, res) => {
  res.status(200).json({ success: true, message: '登出成功' });
};

// 6. Recall Memory (忘記密碼 - 申請重設)
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ success: false, message: '找不到此信箱' });

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1小時後過期

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetPasswordExpires
      }
    });

    // 模擬寄信 (印在終端機)
    const resetUrl = `http://localhost:3000/guild-supply/auth/password/reset?token=${resetToken}`;
    await sendMockEmail(user.email, resetUrl);

    res.status(200).json({ success: true, message: '重設信件已發送 (請看終端機)' });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 7. New Incantation (重設密碼 - 執行修改)
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: '連結無效或已過期' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    });

    res.status(200).json({ success: true, message: '密碼重設成功，請使用新密碼登入' });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 8. Refresh Mana (換發 Token)
const refreshToken = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ success: false, message: '無 Token' });
    
    const oldToken = authHeader.substring(7);
    
    try {
        const decoded = jwt.verify(oldToken, process.env.JWT_SECRET);
        const newToken = jwt.sign(
            { id: decoded.id, email: decoded.email, role: decoded.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.status(200).json({ success: true, message: 'Token 已更新', token: newToken });
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Token 無效或已過期' });
    }
}

module.exports = { 
  signup, 
  login, 
  getProfile, 
  updateProfile, 
  logout,
  forgotPassword, 
  resetPassword, 
  refreshToken 
};