const prisma = require('../utils/prisma');

// ==============================
// 1. Calculate Cost (試算：預覽訂單金額)
// ==============================
const previewOrder = async (req, res) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: { 
                items: { 
                    include: { product: true } 
                } 
            }
        });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: '背包是空的，無法結帳' });
        }

        let subtotal = 0;
        const items = cart.items.map(item => {
            const itemTotal = item.quantity * item.product.price;
            subtotal += itemTotal;
            return {
                title: item.product.title,
                price: item.product.price,
                quantity: item.quantity,
                total: itemTotal
            };
        });

        const shippingFee = subtotal >= 2000 ? 0 : 100; 

        const discount = 0;

        const total = subtotal + shippingFee - discount;

        res.status(200).json({
            success: true,
            data: {
                items, 
                subtotal, 
                shippingFee, 
                discount, 
                total, 
                canCheckout: true
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: '試算失敗: ' + error.message });
    }
};

// ==============================
// 2. Dispatch Caravan (正式下單)
// ==============================
const createOrder = async (req, res) => {
    try {
        const { note } = req.body; 

        const cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: { items: { include: { product: true } } }
        });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: '背包是空的，無法出貨' });
        }

        let total = 0;
        const orderItemsData = cart.items.map(item => {
            total += item.quantity * item.product.price;
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price 
            };
        });
        
        const shippingFee = total >= 2000 ? 0 : 100;
        total += shippingFee;

        const newOrder = await prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    userId: req.user.id,
                    total: total,
                    status: 'PENDING', 
                    items: {
                        create: orderItemsData
                    }
                }
            });

            await tx.cartItem.deleteMany({
                where: { cartId: cart.id }
            });


            return order;
        });

        res.status(201).json({ 
            success: true, 
            message: '商隊已出發 (訂單成立)', 
            orderId: newOrder.id,
            total: newOrder.total
        });

    } catch (error) {
        res.status(500).json({ success: false, message: '下單失敗: ' + error.message });
    }
};

module.exports = { previewOrder, createOrder };