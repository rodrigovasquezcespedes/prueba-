import pool from '../config/db.js'

const addFavorite = async (id_user, id_product) => {
  const query =
    'INSERT INTO favorites (id_user, id_product) VALUES ($1, $2) RETURNING *'
  const values = [id_user, id_product]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getFavoritesByUserId = async id_user => {
  const query = 'SELECT * FROM favorites WHERE id_user = $1'
  const values = [id_user]
  const result = await pool.query(query, values)
  return result.rows
}

const removeFavorite = async id_favorite => {
  const query = 'DELETE FROM favorites WHERE id_favorite = $1 RETURNING *'
  const values = [id_favorite]
  const result = await pool.query(query, values)
  return result.rows[0]
}

export default {
  addFavorite,
  getFavoritesByUserId,
  removeFavorite
}
