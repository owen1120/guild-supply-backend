const prisma = require('../utils/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const calculateLevel = (exp) => {
    if (!exp) return { level: 1, nextThreshold: 100 };
    const level = Math.floor(Math.sqrt(exp / 100)) + 1;
    const nextLevelExp = Math.pow(level, 2) * 100; 
    return { level, nextThreshold: nextLevelExp };
};

// ==========================================
// 1. 基礎認證 (Signup / Login)
// ==========================================

const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ success: false, message: '此信箱已被註冊' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'USER'
      }
    });

    res.status(201).json({ success: true, message: '冒險者註冊成功', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ success: false, message: '註冊失敗: ' + error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ success: false, message: '找不到此冒險者' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: '密碼錯誤' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(200).json({ 
        success: true, 
        message: '登入成功', 
        token,
        user: { id: user.id, email: user.email, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '登入失敗' });
  }
};

const logout = async (req, res) => {
    res.status(200).json({ success: true, message: '已登出' });
};

// ==========================================
// 2. User Profile (冒險者檔案 - 聚合查詢)
// ==========================================
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [user, activeQuests, completedQuests, orderStats, wishlistItems] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        include: {
            addresses: true,
            achievements: { include: { achievement: true } },
            coupons: { 
                where: { isUsed: false }, 
                include: { coupon: true } 
            }
        }
      }),

      prisma.userQuest.findMany({
        where: { userId, status: 'ONGOING' },
        include: { quest: true }
      }),

      prisma.userQuest.findMany({
        where: { userId, status: { in: ['COMPLETED', 'CLAIMED'] } },
        include: { quest: true },
        take: 5, 
        orderBy: { completedAt: 'desc' }
      }),

      prisma.order.aggregate({
        where: { userId },
        _count: { id: true }, 
        _sum: { total: true }, 
        _max: { createdAt: true } 
      }),

      prisma.wishlistItem.findMany({
        where: { userId },
        select: { productId: true, addedAt: true }
      })
    ]);

    if (!user) return res.status(404).json({ success: false, message: '找不到使用者資料' });

    const levelStats = calculateLevel(user.exp);

    const profileData = {
        user_id: user.id,
        created_at: user.createdAt,
        updated_at: user.updatedAt,

        identity: {
            real_name: user.realName,
            codename: user.codename,
            email: user.email,
            phone: user.phone,
            avatar_url: user.avatar
        },

        guild_stats: {
            class: user.class,
            rank_title: user.rankTitle,
            level: levelStats.level,
            experience_points: user.exp,
            next_rank_threshold: levelStats.nextThreshold,
            achievements: user.achievements.map(ua => ({
                id: ua.achievementId,
                name: ua.achievement.title,
                icon: ua.achievement.icon,
                unlocked_at: ua.unlockedAt
            }))
        },

        wallet: {
            currency_name: "Guild Coins",
            current_balance: user.points,
            active_coupons: user.coupons.map(uc => ({
                code: uc.coupon.code,
                name: uc.coupon.description,
                value: uc.coupon.discount,
                expires_at: uc.coupon.expiresAt
            }))
        },

        quest_log: {
            summary: {
                active_count: activeQuests.length,
                completed_count: completedQuests.length
            },
            active_missions: activeQuests.map(uq => ({
                mission_id: uq.questId,
                title: uq.quest.title,
                status: uq.status,
                progress: {
                    current: uq.progress,
                    target: uq.quest.target,
                    percentage: Math.min(100, Math.round((uq.progress / uq.quest.target) * 100))
                },
                rewards: { points: uq.quest.rewardPoints },
                expires_at: uq.quest.expiresAt
            })),
            completed_history: completedQuests.map(uq => ({
                mission_id: uq.questId,
                title: uq.quest.title,
                status: uq.status,
                completed_at: uq.completedAt
            }))
        },

        logistics: {
            saved_addresses: user.addresses.map(addr => ({
                id: addr.id,
                recipient: addr.recipient,
                phone: addr.phone,
                full_address: `${addr.city} ${addr.district} ${addr.detail}`,
                is_default: addr.isDefault
            }))
        },

        inventory_management: {
            wishlist: wishlistItems,
            order_stats: {
                total_orders: orderStats._count.id,
                total_spend: orderStats._sum.total || 0,
                last_order_date: orderStats._max.createdAt
            }
        },

        preferences: {
            marketing_consent: user.marketingConsent,
            preferred_activities: user.preferredActivities
        }
    };

    res.status(200).json({ success: true, data: profileData });

  } catch (error) {
    res.status(500).json({ success: false, message: '讀取檔案失敗: ' + error.message });
  }
};

// ==========================================
// 3. Update Profile (更新資料)
// ==========================================
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
        realName, codename, phone, avatar, 
        marketingConsent, preferredActivities 
    } = req.body;

    let safeMarketingConsent = undefined;
    if (marketingConsent !== undefined) {
        safeMarketingConsent = String(marketingConsent) === 'true';
    }

    let safeActivities = undefined;
    if (preferredActivities !== undefined) {
        safeActivities = Array.isArray(preferredActivities) 
            ? preferredActivities 
            : [preferredActivities];
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        realName,
        codename,
        phone,
        avatar,
        marketingConsent: safeMarketingConsent, 
        preferredActivities: safeActivities
      }
    });

    res.status(200).json({ success: true, message: '檔案已更新', data: {
        realName: updatedUser.realName,
        codename: updatedUser.codename
    }});

  } catch (error) {
    console.error('🔥 updateProfile 錯誤:', error);
    res.status(500).json({ success: false, message: '更新失敗', error: error.message });
  }
};

const refreshToken = async (req, res) => res.json({message: "Not implemented yet"});
const forgotPassword = async (req, res) => res.json({message: "Not implemented yet"});
const resetPassword = async (req, res) => res.json({message: "Not implemented yet"});

module.exports = {
  signup,
  login,
  logout,
  getProfile, 
  updateProfile,
  refreshToken,
  forgotPassword,
  resetPassword
};