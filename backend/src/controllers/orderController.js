import orderModel from '../models/orderModel.js'

const processPayment = async (req, res) => {
  try {
    const { idUser, items, paymentMethod } = req.body // Datos del carrito y método de pago desde el frontend

    // Calcular el total de la compra
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

    // Crear el pedido en la tabla 'orders'
    const order = await orderModel.createOrder(idUser, totalAmount)

    // Insertar los productos en 'order_items'
    await orderModel.createOrderItems(order.id_order, items)

    // Registrar el pago en la tabla 'payments'
    const payment = await orderModel.createPayment(
      order.id_order,
      totalAmount,
      paymentMethod
    )

    // Enviar respuesta de éxito
    res.status(201).json({
      message: 'Compra realizada con éxito',
      order,
      payment
    })
  } catch (error) {
    console.error('Error al procesar el pago:', error)
    res.status(500).json({ message: 'Error al procesar el pago' })
  }
}

export default { processPayment }
