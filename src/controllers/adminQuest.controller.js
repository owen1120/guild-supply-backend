const prisma = require('../utils/prisma');

// ==============================
// 1. Post Bounty (發布新任務 - 支援複雜 JSON)
// ==============================
const createQuest = async (req, res) => {
  try {
    const { 
        type,
        display_info,
        objectives,
        rewards,
        constraints,
        schedule,
        is_active,
        repeatable
    } = req.body;

    if (!display_info?.title || !objectives || objectives.length === 0) {
      return res.status(400).json({ success: false, message: '任務標題與目標設定為必填' });
    }

    let questType = 'MAIN';
    if (type === 'DAILY_QUEST') questType = 'DAILY';
    if (type === 'EVENT_QUEST') questType = 'EVENT';

    const newQuest = await prisma.quest.create({
      data: {
        type: questType,
        isActive: is_active !== undefined ? is_active : true,
        repeatable: repeatable || false,
        
        displayInfo: display_info,
        objectives: objectives,
        rewards: rewards || {},
        constraints: constraints || {},
        
        startDate: schedule?.start_at ? new Date(schedule.start_at) : new Date(),
        endDate: schedule?.end_at ? new Date(schedule.end_at) : null
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
    const { 
        type, display_info, objectives, rewards, 
        constraints, schedule, is_active, repeatable 
    } = req.body;

    const existing = await prisma.quest.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: '找不到該任務' });

    const dataToUpdate = {};
    
    if (type) {
        if (type === 'DAILY_QUEST') dataToUpdate.type = 'DAILY';
        else if (type === 'EVENT_QUEST') dataToUpdate.type = 'EVENT';
        else dataToUpdate.type = 'MAIN';
    }
    
    if (is_active !== undefined) dataToUpdate.isActive = is_active;
    if (repeatable !== undefined) dataToUpdate.repeatable = repeatable;
    
    if (display_info) dataToUpdate.displayInfo = display_info;
    if (objectives) dataToUpdate.objectives = objectives;
    if (rewards) dataToUpdate.rewards = rewards;
    if (constraints) dataToUpdate.constraints = constraints;
    
    if (schedule) {
        if (schedule.start_at) dataToUpdate.startDate = new Date(schedule.start_at);
        if (schedule.end_at) dataToUpdate.endDate = new Date(schedule.end_at);
    }

    const updatedQuest = await prisma.quest.update({
      where: { id },
      data: dataToUpdate
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

    await prisma.quest.delete({ where: { id } });

    res.status(200).json({ success: true, message: '懸賞令已撤除 (刪除成功)' });
  } catch (error) {
    if (error.code === 'P2003') {
        return res.status(400).json({ success: false, message: '無法刪除：已有冒險者接取了此任務，請改為停用 (isActive: false)。' });
    }
    res.status(500).json({ success: false, message: '刪除失敗: ' + error.message });
  }
};

module.exports = { createQuest, updateQuest, deleteQuest };