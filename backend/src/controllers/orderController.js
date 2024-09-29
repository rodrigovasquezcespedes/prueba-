import orderModel from '../models/orderModel.js'
import paymentModel from '../models/paymentModel.js'

const processOrder = async (req, res) => {
  const { idUser, items, paymentMethod } = req.body

  try {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const order = await orderModel.createOrder(idUser, totalAmount)

    for (const item of items) {
      console.log('Insertando ítem de la orden:', item)
      await orderModel.createOrderItem(
        order.id_order,
        item.id_product,
        item.quantity,
        item.price
      )
    }

    await paymentModel.createPayment(order.id_order, totalAmount, paymentMethod)

    res.status(201).json({ message: 'Compra realizada exitosamente', order })
  } catch (error) {
    console.error('Error procesando la compra:', error)
    res.status(500).json({ message: 'Error al procesar la compra', error })
  }
}

const getUserOrders = async (req, res) => {
  const { userId } = req.params

  try {
    const orders = await orderModel.getUserOrders(userId)
    res.status(200).json(orders)
  } catch (error) {
    console.error('Error al obtener las órdenes:', error)
    res.status(500).json({ message: 'Error al obtener las órdenes', error })
  }
}

export default { processOrder, getUserOrders }
