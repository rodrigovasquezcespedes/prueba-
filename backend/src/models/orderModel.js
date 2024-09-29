import pool from '../config/db.js'

const createOrder = async (userId, totalAmount) => {
  const { rows } = await pool.query(
    `INSERT INTO orders (id_user, total_amount) 
     VALUES ($1, $2) RETURNING *`,
    [userId, totalAmount]
  )
  return rows[0]
}

const createOrderItem = async (orderId, productId, quantity, price) => {
  const { rows } = await pool.query(
    `INSERT INTO order_items (id_order, id_product, quantity, price) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [orderId, productId, quantity, price]
  )
  return rows[0]
}

const getUserOrders = async userId => {
  const { rows } = await pool.query(
    `SELECT o.id_order, o.order_date, o.total_amount, p.name AS product_name, oi.quantity, oi.price
     FROM orders o
     JOIN order_items oi ON o.id_order = oi.id_order
     JOIN products p ON oi.id_product = p.id_product
     WHERE o.id_user = $1
     ORDER BY o.order_date DESC`,
    [userId]
  )
  return rows
}

export default { createOrder, createOrderItem, getUserOrders }
