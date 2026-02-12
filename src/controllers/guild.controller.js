const prisma = require('../utils/prisma');
const bcrypt = require('bcryptjs');

// 1. Enhance Seal (修改密碼 - 登入狀態下)
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: '舊咒語(密碼)不正確' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    res.status(200).json({ success: true, message: '封印已加強 (密碼修改成功)' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Void Contract (刪除帳號)
const deleteAccount = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.user.id }
    });

    res.status(200).json({ success: true, message: '契約已銷毀 (帳號刪除成功)' });
  } catch (error) {
    res.status(500).json({ success: false, message: '刪除失敗: ' + error.message });
  }
};

// 3. Trade History (歷史訂單)
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        items: {
          include: { product: true } 
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取交易紀錄' });
  }
};

// 4. Backpack (背包/庫存 - 查詢所有已購買的商品)
const getInventory = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { 
        userId: req.user.id,
        status: { in: ['PAID', 'SHIPPED', 'COMPLETED'] } 
      },
      include: {
        items: { include: { product: true } }
      }
    });

    let backpack = [];
    orders.forEach(order => {
      order.items.forEach(item => {
        backpack.push({
          product: item.product,
          quantity: item.quantity,
          purchaseDate: order.createdAt
        });
      });
    });

    res.status(200).json({ success: true, data: backpack });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法開啟背包' });
  }
};

const checkout = async (req, res) => {
    try {
        const { items } = req.body; 
        
        let total = 0;
        
        const newOrder = await prisma.order.create({
            data: {
                userId: req.user.id,
                status: 'PAID', 
                total: 9999, 
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: 500 
                    }))
                }
            }
        });
        res.status(201).json({ success: true, message: '下單成功', order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: '下單失敗: ' + error.message });
    }
}

module.exports = { changePassword, deleteAccount, getOrders, getInventory, checkout };