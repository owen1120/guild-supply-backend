const prisma = require('../utils/prisma');

// ==============================
// 1. Master Log (訂單總覽)
// ==============================
const getAdminOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (status) {
        where.status = status;
    }

    const [orders, total] = await prisma.$transaction([
      prisma.order.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }, 
        include: {
            user: {
                select: { id: true, email: true } 
            },
            items: {
                include: {
                    product: {
                        select: { title: true, price: true, images: true }
                    }
                }
            }
        }
      }),
      prisma.order.count({ where })
    ]);

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '無法讀取訂單紀錄: ' + error.message });
  }
};

// ==============================
// 2. Dispatch Command (更新訂單狀態)
// ==============================
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    const validStatuses = ['PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: '無效的訂單狀態' });
    }

    const existingOrder = await prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
        return res.status(404).json({ success: false, message: '找不到該訂單' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status }
    });

    res.status(200).json({ success: true, message: `訂單狀態已更新為 ${status}`, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新失敗: ' + error.message });
  }
};

module.exports = { getAdminOrders, updateOrderStatus };