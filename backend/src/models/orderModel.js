import pool from '../config/db.js'

const createOrder = async (idUser, totalAmount) => {
  const query = `
    INSERT INTO orders (id_user, total_amount)
    VALUES ($1, $2)
    RETURNING *;
  `
  const values = [idUser, totalAmount]
  const result = await pool.query(query, values)
  return result.rows[0]
}

// Insertar los productos en order_items
const createOrderItems = async (idOrder, items) => {
  const query = `
    INSERT INTO order_items (id_order, id_product, quantity, price)
    VALUES ($1, $2, $3, $4);
  `
  for (const item of items) {
    const values = [idOrder, item.id_product, item.quantity, item.price]
    await pool.query(query, values)
  }
}

// Registrar el pago
const createPayment = async (idOrder, amount, paymentMethod) => {
  const query = `
    INSERT INTO payments (id_order, amount, payment_method)
    VALUES ($1, $2, $3)
    RETURNING *;
  `
  const values = [idOrder, amount, paymentMethod]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getOrdersByUserId = async idUser => {
  const query = `
    SELECT 
      o.id_order, 
      oi.quantity, 
      oi.price AS total_price, 
      p.name AS product_name, 
      o.order_date AS purchase_date
    FROM orders o
    JOIN order_items oi ON o.id_order = oi.id_order
    JOIN products p ON oi.id_product = p.id_product
    WHERE o.id_user = $1
    ORDER BY o.order_date DESC;
  `
  const values = [idUser]
  const result = await pool.query(query, values)
  return result.rows
}

export default {
  createOrder,
  createOrderItems,
  createPayment,
  getOrdersByUserId
}
