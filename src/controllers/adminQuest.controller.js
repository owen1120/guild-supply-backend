const prisma = require('../utils/prisma');

// ==============================
// 1. Post Bounty (發布新任務)
// ==============================
const createQuest = async (req, res) => {
  try {
    const { title, description, target, rewardPoints, expiresAt } = req.body;

    if (!title || !target || !rewardPoints) {
      return res.status(400).json({ success: false, message: '標題、目標數值與獎勵點數為必填' });
    }

    const newQuest = await prisma.quest.create({
      data: {
        title,
        description: description || '',
        target: parseInt(target),
        rewardPoints: parseInt(rewardPoints), 
        expiresAt: expiresAt ? new Date(expiresAt) : null 
      }
    });

    res.status(201).json({ success: true, message: '懸賞令已張貼 (任務發布成功)', data: newQuest });
  } catch (error) {
    res.status(500).json({ success: false, message: '發布失敗: ' + error.message });
  }
};

// ==============================
// 2. Edit Bounty (修改任務)
// ==============================
const updateQuest = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, target, rewardPoints, expiresAt } = req.body;

    const existing = await prisma.quest.findUnique({ where: { id } });
    if (!existing) {
        return res.status(404).json({ success: false, message: '找不到該任務' });
    }

    const updatedQuest = await prisma.quest.update({
      where: { id },
      data: {
        title,
        description,
        target: target ? parseInt(target) : undefined,
        rewardPoints: rewardPoints ? parseInt(rewardPoints) : undefined,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined
      }
    });

    res.status(200).json({ success: true, message: '懸賞內容已變更', data: updatedQuest });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新失敗: ' + error.message });
  }
};

// ==============================
// 3. Remove Bounty (刪除任務)
// ==============================
const deleteQuest = async (req, res) => {
  try {
    const { id } = req.params;

    
    await prisma.quest.delete({
      where: { id }
    });

    res.status(200).json({ success: true, message: '懸賞令已撤除 (刪除成功)' });
  } catch (error) {
    if (error.code === 'P2003') {
        return res.status(400).json({ success: false, message: '無法刪除：已有冒險者接取了此任務。建議改為修改過期時間。' });
    }
    res.status(500).json({ success: false, message: '刪除失敗: ' + error.message });
  }
};

module.exports = { createQuest, updateQuest, deleteQuest };