const prisma = require('../utils/prisma');

const getDashboardStats = async (req, res) => {
  try {
    console.log('📊 [Dashboard] 正在計算戰情數據...');

    const [
        revenueStats, 
        userCount, 
        lowStockCount, 
        pendingOrdersCount,
        recentOrders
    ] = await Promise.all([
      
      // 1. 總營收與總訂單數 (排除取消的訂單)
      prisma.order.aggregate({
        _sum: { total: true },
        _count: { id: true },
        where: { 
            status: { not: 'CANCELLED' } 
        }
      }),

      // 2. 冒險者總數 (只算 USER)
      prisma.user.count({
        where: { role: 'USER' }
      }),

      // 3. 庫存告急商品數 (庫存 <= 5)
      prisma.product.count({
        where: { 
            stock: { lte: 5 },
            isPublished: true 
        }
      }),

      // 4. 待處理訂單數 (PENDING)
      prisma.order.count({
        where: { status: 'PENDING' }
      }),

      // 5. 最新 5 筆訂單 (給後台首頁快速查看用)
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: { email: true, codename: true }
            }
        }
      })
    ]);

    const stats = {
        overview: {
            total_revenue: revenueStats._sum.total || 0, // 總收入
            total_orders: revenueStats._count.id,        // 總訂單數
            total_users: userCount,                      // 會員數
            pending_orders: pendingOrdersCount           // 待辦事項
        },
        inventory_alert: {
            low_stock_count: lowStockCount               // 庫存警告
        },
        recent_activity: recentOrders.map(order => ({
            id: order.id,
            user: order.user?.codename || order.user?.email || '未知',
            total: order.total,
            status: order.status,
            date: order.createdAt
        }))
    };

    res.status(200).json({ success: true, data: stats });

  } catch (error) {
    console.error('🔥 [Dashboard] 統計失敗:', error);
    res.status(500).json({ success: false, message: '無法讀取戰情數據' });
  }
};

module.exports = {
  getDashboardStats
};