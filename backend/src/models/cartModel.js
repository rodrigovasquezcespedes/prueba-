import pool from '../config/db.js'

const createCart = async idUser => {
  const query = 'INSERT INTO cart (id_user) VALUES ($1) RETURNING *'
  const values = [idUser]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getCartByUserId = async idUser => {
  const query = 'SELECT * FROM cart WHERE id_user = $1'
  const values = [idUser]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const addItemToCart = async (idCart, idProduct, quantity) => {
  const query =
    'INSERT INTO cart_items (id_cart, id_product, quantity) VALUES ($1, $2, $3) RETURNING *'
  const values = [idCart, idProduct, quantity]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getCartItems = async idCart => {
  const query = 'SELECT * FROM cart_items WHERE id_cart = $1'
  const values = [idCart]
  const result = await pool.query(query, values)
  return result.rows
}

const removeItemFromCart = async idCartItem => {
  const query = 'DELETE FROM cart_items WHERE id_cart_item = $1 RETURNING *'
  const values = [idCartItem]
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
