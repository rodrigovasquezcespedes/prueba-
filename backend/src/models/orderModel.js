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

export default {
  createOrder,
  createOrderItems,
  createPayment
}
