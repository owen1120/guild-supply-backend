const prisma = require('../utils/prisma');

// ==============================
// 1. Mission Board (查看可接任務)
// ==============================
const getQuests = async (req, res) => {
  try {
    const userId = req.user.id;

    const myQuests = await prisma.userQuest.findMany({
      where: { userId },
      select: { questId: true }
    });
    const myQuestIds = myQuests.map(q => q.questId);

    const availableQuests = await prisma.quest.findMany({
      where: {
        isActive: true,
        id: { notIn: myQuestIds }
      },
      select: {
          id: true,
          type: true,
          displayInfo: true, 
          objectives: true,
          rewards: true,
          constraints: true,
          endDate: true
      }
    });

    res.status(200).json({ success: true, data: availableQuests });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取佈告欄' });
  }
};

// ==============================
// 2. Quest Log (我的任務日誌)
// ==============================
const getMyQuests = async (req, res) => {
  try {
    const userId = req.user.id;

    const userQuests = await prisma.userQuest.findMany({
      where: { userId },
      include: { quest: true },
      orderBy: { acceptedAt: 'desc' }
    });

    const formattedQuests = userQuests.map(uq => ({
        mission_id: uq.quest.id,
        user_quest_id: uq.id,
        status: uq.status, 
        
        progress: {
            current_percent: uq.progress, 
            details: uq.progressDetail || {} 
        },
        
        type: uq.quest.type,
        display_info: uq.quest.displayInfo,
        objectives: uq.quest.objectives,
        rewards: uq.quest.rewards,
        
        accepted_at: uq.acceptedAt,
        completed_at: uq.completedAt
    }));

    res.status(200).json({ success: true, data: formattedQuests });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取任務日誌' });
  }
};

// ==============================
// 3. Accept Quest (接取任務)
// ==============================
const acceptQuest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; 

    const quest = await prisma.quest.findUnique({ where: { id } });
    if (!quest || !quest.isActive) {
        return res.status(404).json({ success: false, message: '任務已過期或不存在' });
    }

    const existing = await prisma.userQuest.findFirst({
      where: { userId, questId: id }
    });
    if (existing && !quest.repeatable) {
        return res.status(400).json({ success: false, message: '您已經接取過此任務' });
    }

    const initialProgress = {};
    if (Array.isArray(quest.objectives)) {
        quest.objectives.forEach(obj => {
            if (obj.step_id) initialProgress[`step_${obj.step_id}`] = 0;
        });
    }

    const newUserQuest = await prisma.userQuest.create({
      data: {
        userId,
        questId: id,
        status: 'ONGOING',
        progress: 0,
        progressDetail: initialProgress
      }
    });

    res.status(201).json({ success: true, message: '任務接取成功！', data: newUserQuest });
  } catch (error) {
    res.status(500).json({ success: false, message: '接取失敗: ' + error.message });
  }
};

// ==============================
// 4. Debug Progress (手動回報進度 - 測試用)
// ==============================
const debugProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; 
    const { step_id, value } = req.body; 

    const userQuest = await prisma.userQuest.findFirst({
        where: { userId, questId: id, status: 'ONGOING' },
        include: { quest: true }
    });

    if (!userQuest) return res.status(404).json({ success: false, message: '找不到進行中的任務' });

    const currentDetails = userQuest.progressDetail || {};
    const stepKey = `step_${step_id}`;
    
    currentDetails[stepKey] = (currentDetails[stepKey] || 0) + parseInt(value);
    
    const objectives = userQuest.quest.objectives || [];
    let completedSteps = 0;
    let totalSteps = objectives.length;

    objectives.forEach(obj => {
        const key = `step_${obj.step_id}`;
        const currentVal = currentDetails[key] || 0;
        const targetVal = obj.threshold || 1;
        if (currentVal >= targetVal) {
            completedSteps++;
        }
    });

    const newPercent = totalSteps > 0 ? Math.floor((completedSteps / totalSteps) * 100) : 0;
    
    let newStatus = 'ONGOING';
    let completedAt = null;
    if (completedSteps >= totalSteps) {
        newStatus = 'COMPLETED'; 
        completedAt = new Date();
    }

    const updated = await prisma.userQuest.update({
        where: { id: userQuest.id },
        data: {
            progress: newPercent,
            progressDetail: currentDetails,
            status: newStatus,
            completedAt: completedAt ? completedAt : undefined
        }
    });

    res.status(200).json({ 
        success: true, 
        message: newStatus === 'COMPLETED' ? '任務目標達成！請領取獎勵' : '進度已更新', 
        data: { progress: newPercent, detail: currentDetails, status: newStatus } 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: '更新失敗: ' + error.message });
  }
};

// ==============================
// 5. Claim Reward (領取獎勵)
// ==============================
const claimReward = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; 

    const userQuest = await prisma.userQuest.findFirst({
        where: { userId, questId: id, status: 'COMPLETED' }, 
        include: { quest: true }
    });

    if (!userQuest) {
        return res.status(400).json({ success: false, message: '任務尚未完成或已領取' });
    }

    const rewards = userQuest.quest.rewards || {};
    const expGain = rewards.experience_points || 0;
    const coinsGain = rewards.guild_coins || 0;

    await prisma.$transaction([
        prisma.user.update({
            where: { id: userId },
            data: {
                points: { increment: coinsGain },
                exp: { increment: expGain }
            }
        }),
        prisma.userQuest.update({
            where: { id: userQuest.id },
            data: { status: 'CLAIMED' }
        })
    ]);

    res.status(200).json({ 
        success: true, 
        message: `獎勵已發放！獲得 ${coinsGain} 金幣與 ${expGain} 經驗值`,
        data: { coins: coinsGain, exp: expGain }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: '領取失敗: ' + error.message });
  }
};

module.exports = { getQuests, getMyQuests, acceptQuest, debugProgress, claimReward };