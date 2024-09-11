import pool from '../config/db.js'

// Get all favorite products for a user
const getFavoritesByUserId = async userId => {
  const { rows } = await pool.query(
    'SELECT * FROM favorites WHERE id_user = $1',
    [userId]
  )
  return rows
}

// Add a product to favorites
const addFavorite = async (userId, productId) => {
  const { rows } = await pool.query(
    'INSERT INTO favorites (id_user, id_product) VALUES ($1, $2) RETURNING *',
    [userId, productId]
  )
  return rows[0]
}

// Remove a product from favorites
const removeFavorite = async (userId, productId) => {
  await pool.query(
    'DELETE FROM favorites WHERE id_user = $1 AND id_product = $2',
    [userId, productId]
  )
}

export default { getFavoritesByUserId, addFavorite, removeFavorite }
