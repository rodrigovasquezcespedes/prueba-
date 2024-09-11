import pool from '../config/db.js'

// Get the cart for a user
const getCartByUserId = async userId => {
  const { rows } = await pool.query('SELECT * FROM cart WHERE id_user = $1', [
    userId
  ])
  return rows[0]
}

// Get all items in a cart
const getCartItems = async cartId => {
  const { rows } = await pool.query(
    'SELECT * FROM cart_items WHERE id_cart = $1',
    [cartId]
  )
  return rows
}

// Add a product to a cart
const addItemToCart = async (cartId, item) => {
  const { id_product, quantity } = item
  const { rows } = await pool.query(
    'INSERT INTO cart_items (id_cart, id_product, quantity) VALUES ($1, $2, $3) RETURNING *',
    [cartId, id_product, quantity]
  )
  return rows[0]
}

// Update the quantity of a product in the cart
const updateCartItem = async (cartId, item) => {
  const { id_product, quantity } = item
  const { rows } = await pool.query(
    'UPDATE cart_items SET quantity = $1 WHERE id_cart = $2 AND id_product = $3 RETURNING *',
    [quantity, cartId, id_product]
  )
  return rows[0]
}

// Remove a product from the cart
const removeItemFromCart = async (cartId, productId) => {
  await pool.query(
    'DELETE FROM cart_items WHERE id_cart = $1 AND id_product = $2',
    [cartId, productId]
  )
}

// Create a new cart for a user
const createCart = async userId => {
  const { rows } = await pool.query(
    'INSERT INTO cart (id_user) VALUES ($1) RETURNING *',
    [userId]
  )
  return rows[0]
}

// Delete a cart and its items
const deleteCart = async cartId => {
  await pool.query('DELETE FROM cart_items WHERE id_cart = $1', [cartId])
  await pool.query('DELETE FROM cart WHERE id_cart = $1', [cartId])
}

export default {
  getCartByUserId,
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  createCart,
  deleteCart
}
