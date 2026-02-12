const prisma = require('../utils/prisma');

// 1. Notice Board (任務公佈欄 - 列出所有有效任務)
const getQuests = async (req, res) => {
  try {
    const quests = await prisma.quest.findMany({
      where: {
        OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } }
        ]
      }
    });
    res.status(200).json({ success: true, data: quests });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取公佈欄' });
  }
};

// 2. Accept Request (接取任務)
const acceptQuest = async (req, res) => {
  try {
    const { id } = req.params; 

    const existing = await prisma.userQuest.findFirst({
      where: {
        userId: req.user.id,
        questId: id
      }
    });

    if (existing) {
      return res.status(400).json({ success: false, message: '你已經接取過此任務了' });
    }

    await prisma.userQuest.create({
      data: {
        userId: req.user.id,
        questId: id,
        status: 'ONGOING',
        progress: 0
      }
    });

    res.status(200).json({ success: true, message: '任務已接取！請查看冒險日誌。' });
  } catch (error) {
    res.status(500).json({ success: false, message: '接取失敗' });
  }
};

// 3. Quest Log (我的冒險日誌 - 查詢已接任務)
const getMyQuests = async (req, res) => {
  try {
    const myQuests = await prisma.userQuest.findMany({
      where: { userId: req.user.id },
      include: { quest: true }, 
      orderBy: { acceptedAt: 'desc' }
    });
    res.status(200).json({ success: true, data: myQuests });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取日誌' });
  }
};

// 4. Claim Bounty (領取獎勵)
const claimReward = async (req, res) => {
  try {
    const { id } = req.params; 

    const userQuest = await prisma.userQuest.findFirst({
      where: {
        userId: req.user.id,
        questId: id
      },
      include: { quest: true }
    });

    if (!userQuest) return res.status(404).json({ success: false, message: '你沒接這個任務' });
    if (userQuest.status === 'CLAIMED') return res.status(400).json({ success: false, message: '已經領過了' });
    
    if (userQuest.progress < userQuest.quest.target && userQuest.status !== 'COMPLETED') {
        return res.status(400).json({ success: false, message: '任務尚未完成，無法領獎' });
    }

    await prisma.$transaction([
        // 1. 給點數
        prisma.user.update({
            where: { id: req.user.id },
            data: { points: { increment: userQuest.quest.rewardPoints } }
        }),
        // 2. 標記為已領獎
        prisma.userQuest.update({
            where: { id: userQuest.id },
            data: { status: 'CLAIMED', completedAt: new Date() }
        })
    ]);

    res.status(200).json({ success: true, message: `任務完成！獲得 ${userQuest.quest.rewardPoints} 點數` });

  } catch (error) {
    res.status(500).json({ success: false, message: '領獎失敗: ' + error.message });
  }
};

const debugProgress = async (req, res) => {
    try {
        const { id } = req.params; 
        const { amount } = req.body; 

        const userQuest = await prisma.userQuest.findFirst({
            where: { userId: req.user.id, questId: id }
        });

        if(!userQuest) return res.status(404).json({message: "沒接任務"});

        await prisma.userQuest.update({
            where: { id: userQuest.id },
            data: { progress: { increment: amount } }
        });

        res.json({ success: true, message: "進度已更新 (測試用)" });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { getQuests, acceptQuest, getMyQuests, claimReward, debugProgress };