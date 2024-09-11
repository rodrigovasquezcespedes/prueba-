import paymentModel from '../models/paymentModel.js'

const createPayment = async (req, res) => {
  const { id_order, amount, payment_method, status } = req.body
  try {
    const payment = await paymentModel.createPayment(
      id_order,
      amount,
      payment_method,
      status
    )
    res.status(201).json(payment)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pago', error })
  }
}

const getPaymentById = async (req, res) => {
  const { id } = req.params
  try {
    const payment = await paymentModel.getPaymentById(id)
    res.status(200).json(payment)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el pago', error })
  }
}

const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentModel.getAllPayments()
    res.status(200).json(payments)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pagos', error })
  }
}

export default {
  createPayment,
  getPaymentById,
  getAllPayments
}
