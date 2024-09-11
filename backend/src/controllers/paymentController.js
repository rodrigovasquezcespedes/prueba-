import paymentModel from '../models/paymentModel.js';

export const getPayments = async (req, res) => {
    try {
        const payments = await paymentModel.getPaymentsByUserId(req.params.userId);
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPayment = async (req, res) => {
    try {
        const payment = await paymentModel.getPaymentById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPayment = async (req, res) => {
    try {
        const newPayment = await paymentModel.createPayment(req.body);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePaymentStatus = async (req, res) => {
    try {
        const updatedPayment = await paymentModel.updatePaymentStatus(req.params.id, req.body.status);
        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(updatedPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePayment = async (req, res) => {
    try {
        await paymentModel.deletePayment(req.params.id);
        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
