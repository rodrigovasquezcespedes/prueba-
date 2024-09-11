import pool from '../config/db.js'

const createPayment = async (id_order, amount, payment_method, status) => {
  const query =
    'INSERT INTO payments (id_order, amount, payment_method, status) VALUES ($1, $2, $3, $4) RETURNING *'
  const values = [id_order, amount, payment_method, status]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getPaymentById = async id => {
  const query = 'SELECT * FROM payments WHERE id_payment = $1'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getAllPayments = async () => {
  const query = 'SELECT * FROM payments'
  const result = await pool.query(query)
  return result.rows
}

export default {
  createPayment,
  getPaymentById,
  getAllPayments
}
