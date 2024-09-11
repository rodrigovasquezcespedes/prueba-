import pool from '../config/db.js'

const createOrder = async (id_user, total_amount, status) => {
  const query =
    'INSERT INTO orders (id_user, total_amount, status) VALUES ($1, $2, $3) RETURNING *'
  const values = [id_user, total_amount, status]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getOrderById = async id => {
  const query = 'SELECT * FROM orders WHERE id_order = $1'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getAllOrders = async () => {
  const query = 'SELECT * FROM orders'
  const result = await pool.query(query)
  return result.rows
}

const updateOrderStatus = async (id, status) => {
  const query = 'UPDATE orders SET status = $1 WHERE id_order = $2 RETURNING *'
  const values = [status, id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const deleteOrder = async id => {
  const query = 'DELETE FROM orders WHERE id_order = $1 RETURNING *'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

export default {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
}
