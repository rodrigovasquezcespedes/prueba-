import orderModel from '../models/orderModel.js'

const processPayment = async (req, res) => {
  try {
    const { idUser, items, paymentMethod } = req.body // Aquí esperas idUser, items, paymentMethod

    // Verificación de que los datos sean completos
    if (!idUser || !items || items.length === 0 || !paymentMethod) {
      return res
        .status(400)
        .json({ message: 'Datos incompletos para procesar el pago' })
    }

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
      orderId: order.id_order,
      paymentId: payment.id_payment
    })
  } catch (error) {
    console.error('Error al procesar el pago:', error)
    res.status(500).json({ message: 'Error al procesar el pago' })
  }
}

const getUserOrders = async (req, res) => {
  try {
    const { idUser } = req.params // Obtener el id_user de los parámetros de la URL

    // Verificar si el ID de usuario está presente
    if (!idUser) {
      return res.status(400).json({ message: 'ID de usuario es requerido' })
    }

    // Obtener las órdenes del usuario desde el modelo
    const orders = await orderModel.getOrdersByUserId(idUser)

    // Verificar si no hay órdenes para el usuario
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: 'No se encontraron compras para este usuario' })
    }

    // Enviar las órdenes encontradas
    res.status(200).json(orders)
  } catch (error) {
    console.error('Error al obtener las compras del usuario:', error)
    res.status(500).json({ message: 'Error al obtener las compras' })
  }
}

export default { processPayment, getUserOrders }
