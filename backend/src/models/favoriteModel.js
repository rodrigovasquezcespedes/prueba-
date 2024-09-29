import pool from '../config/db.js'

const addFavorite = async (idUser, idProduct) => {
  const query =
    'INSERT INTO favorites (id_user, id_product) VALUES ($1, $2) RETURNING *'
  const values = [idUser, idProduct]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getFavoritesByUserId = async idUser => {
  const query = 'SELECT * FROM favorites WHERE id_user = $1'
  const values = [idUser]
  const result = await pool.query(query, values)
  return result.rows
}

const removeFavorite = async idFavorite => {
  console.log('Deleting favorite with ID:', idFavorite) // Verificar el ID que se recibe
  const query = 'DELETE FROM favorites WHERE id_favorite = $1 RETURNING *'
  const values = [idFavorite]
  const result = await pool.query(query, values)
  return result.rows[0]
}

export default {
  addFavorite,
  getFavoritesByUserId,
  removeFavorite
}
