import pool from '../config/db.js'

// Crear el pago asociado a una orden
const createPayment = async (orderId, amount, paymentMethod) => {
  const { rows } = await pool.query(
    `INSERT INTO payments (id_order, amount, payment_method) 
     VALUES ($1, $2, $3) RETURNING *`,
    [orderId, amount, paymentMethod]
  )
  return rows[0] // Devuelve el pago creado
}

// Obtener pagos de una orden
const getPaymentsByOrder = async orderId => {
  const { rows } = await pool.query(
    'SELECT * FROM payments WHERE id_order = $1',
    [orderId]
  )
  return rows // Devuelve todos los pagos asociados a la orden
}

export default { createPayment, getPaymentsByOrder }
