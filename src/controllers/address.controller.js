const prisma = require('../utils/prisma');

// 1. Teleport Points (查詢常用收件地址列表)
const getAddresses = async (req, res) => {
  try {
    // 只搜尋「目前登入者 (req.user.id)」的地址
    const addresses = await prisma.address.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: '讀取傳送點失敗' });
  }
};

// 2. Mark Point (新增收件地址)
const addAddress = async (req, res) => {
  try {
    const { recipient, phone, city, district, detail } = req.body;

    if (!recipient || !phone || !city || !detail) {
      return res.status(400).json({ success: false, message: '請填寫完整的地址資訊' });
    }

    const newAddress = await prisma.address.create({
      data: {
        userId: req.user.id, 
        recipient,
        phone,
        city,
        district: district || '', 
        detail
      }
    });

    res.status(201).json({ success: true, message: '新傳送點已標記', data: newAddress });
  } catch (error) {
    res.status(500).json({ success: false, message: '新增失敗: ' + error.message });
  }
};

// 3. Unmark Point (刪除收件地址)
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params; 

    const address = await prisma.address.findFirst({
      where: { 
        id: id,
        userId: req.user.id 
      }
    });

    if (!address) {
      return res.status(404).json({ success: false, message: '找不到此傳送點或無權限刪除' });
    }

    await prisma.address.delete({
      where: { id: id }
    });

    res.status(200).json({ success: true, message: '傳送點已移除' });

  } catch (error) {
    res.status(500).json({ success: false, message: '刪除失敗' });
  }
};

module.exports = { getAddresses, addAddress, deleteAddress };