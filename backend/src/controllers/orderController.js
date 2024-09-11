import orderModel from '../models/orderModel.js';

const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.getOrdersByUserId(req.params.userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await orderModel.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const items = await orderModel.getOrderItems(order.id_order);
        res.json({ order, items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const newOrder = await orderModel.createOrder(req.body);
        await orderModel.addOrderItems(newOrder.id_order, req.body.items);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const updatedOrder = await orderModel.updateOrderStatus(req.params.id, req.body.status);
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        await orderModel.deleteOrder(req.params.id);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export default { getOrders, getOrder, createOrder, updateOrderStatus, deleteOrder }