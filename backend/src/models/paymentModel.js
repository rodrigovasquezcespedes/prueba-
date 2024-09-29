import pool from '../config/db.js'

const createPayment = async (orderId, amount, paymentMethod) => {
  const { rows } = await pool.query(
    `INSERT INTO payments (id_order, amount, payment_method) 
     VALUES ($1, $2, $3) RETURNING *`,
    [orderId, amount, paymentMethod]
  )
  return rows[0]
}

const getPaymentsByOrder = async orderId => {
  const { rows } = await pool.query(
    'SELECT * FROM payments WHERE id_order = $1',
    [orderId]
  )
  return rows
}

export default { createPayment, getPaymentsByOrder }
