import pool from '../config/db.js'

// Get all payments for a user
const getPaymentsByUserId = async userId => {
  const { rows } = await pool.query(
    'SELECT * FROM payments WHERE id_order IN (SELECT id_order FROM orders WHERE id_user = $1)',
    [userId]
  )
  return rows
}

// Get a single payment by ID
const getPaymentById = async id => {
  const { rows } = await pool.query(
    'SELECT * FROM payments WHERE id_payment = $1',
    [id]
  )
  return rows[0]
}

// Create a new payment
const createPayment = async payment => {
  const { id_order, amount, payment_method, status } = payment
  const { rows } = await pool.query(
    'INSERT INTO payments (id_order, amount, payment_method, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [id_order, amount, payment_method, status]
  )
  return rows[0]
}

// Update a payment's status
const updatePaymentStatus = async (id, status) => {
  const { rows } = await pool.query(
    'UPDATE payments SET status = $1 WHERE id_payment = $2 RETURNING *',
    [status, id]
  )
  return rows[0]
}

// Delete a payment
const deletePayment = async id => {
  await pool.query('DELETE FROM payments WHERE id_payment = $1', [id])
}

export default {
  getPaymentsByUserId,
  getPaymentById,
  createPayment,
  updatePaymentStatus,
  deletePayment
}
