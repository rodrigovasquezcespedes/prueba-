import pool from '../config/db.js'

const createCart = async id_user => {
  const query = 'INSERT INTO cart (id_user) VALUES ($1) RETURNING *'
  const values = [id_user]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getCartByUserId = async id_user => {
  const query = 'SELECT * FROM cart WHERE id_user = $1'
  const values = [id_user]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const addItemToCart = async (id_cart, id_product, quantity) => {
  const query =
    'INSERT INTO cart_items (id_cart, id_product, quantity) VALUES ($1, $2, $3) RETURNING *'
  const values = [id_cart, id_product, quantity]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getCartItems = async id_cart => {
  const query = 'SELECT * FROM cart_items WHERE id_cart = $1'
  const values = [id_cart]
  const result = await pool.query(query, values)
  return result.rows
}

const removeItemFromCart = async id_cart_item => {
  const query = 'DELETE FROM cart_items WHERE id_cart_item = $1 RETURNING *'
  const values = [id_cart_item]
  const result = await pool.query(query, values)
  return result.rows[0]
}

export default {
  createCart,
  getCartByUserId,
  addItemToCart,
  getCartItems,
  removeItemFromCart
}
