import pool from '../config/db.js'

// Get all orders for a user
const getOrdersByUserId = async userId => {
  const { rows } = await pool.query('SELECT * FROM orders WHERE id_user = $1', [
    userId
  ])
  return rows
}

// Get a single order by ID
const getOrderById = async id => {
  const { rows } = await pool.query(
    'SELECT * FROM orders WHERE id_order = $1',
    [id]
  )
  return rows[0]
}

// Get all items in an order
const getOrderItems = async orderId => {
  const { rows } = await pool.query(
    'SELECT * FROM order_items WHERE id_order = $1',
    [orderId]
  )
  return rows
}

// Create a new order
const createOrder = async order => {
  const { id_user, total_amount, status } = order
  const { rows } = await pool.query(
    'INSERT INTO orders (id_user, total_amount, status) VALUES ($1, $2, $3) RETURNING *',
    [id_user, total_amount, status]
  )
  return rows[0]
}

// Add items to the order
const addOrderItems = async (orderId, items) => {
  const queries = items.map(item => {
    return pool.query(
      'INSERT INTO order_items (id_order, id_product, quantity, price) VALUES ($1, $2, $3, $4)',
      [orderId, item.id_product, item.quantity, item.price]
    )
  })
  await Promise.all(queries)
}

// Update the status of an order
const updateOrderStatus = async (id, status) => {
  const { rows } = await pool.query(
    'UPDATE orders SET status = $1 WHERE id_order = $2 RETURNING *',
    [status, id]
  )
  return rows[0]
}

// Delete an order and its items
const deleteOrder = async id => {
  await pool.query('DELETE FROM order_items WHERE id_order = $1', [id])
  await pool.query('DELETE FROM orders WHERE id_order = $1', [id])
}

export default {
  getOrdersByUserId,
  getOrderById,
  getOrderItems,
  createOrder,
  addOrderItems,
  updateOrderStatus,
  deleteOrder
}
