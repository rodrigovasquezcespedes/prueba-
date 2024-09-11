import orderModel from '../models/orderModel.js'

const createOrder = async (req, res) => {
  const { id_user, total_amount, status } = req.body
  try {
    const order = await orderModel.createOrder(id_user, total_amount, status)
    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la orden', error })
  }
}

const getOrderById = async (req, res) => {
  const { id } = req.params
  try {
    const order = await orderModel.getOrderById(id)
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la orden', error })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las órdenes', error })
  }
}

const updateOrderStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  try {
    const updatedOrder = await orderModel.updateOrderStatus(id, status)
    res.status(200).json(updatedOrder)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al actualizar el estado de la orden', error })
  }
}

const deleteOrder = async (req, res) => {
  const { id } = req.params
  try {
    const deletedOrder = await orderModel.deleteOrder(id)
    res.status(200).json(deletedOrder)
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la orden', error })
  }
}

export default {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
}
