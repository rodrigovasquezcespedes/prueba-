import bcrypt from 'bcrypt'
import pool from '../config/db.js'

const createUser = async (name, email, password, role = false) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const query =
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *'
  const values = [name, email, hashedPassword, role]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getUserById = async id => {
  const query = 'SELECT * FROM users WHERE id_user = $1'
  const result = await pool.query(query, [id])
  return result.rows[0]
}

const getAllUsers = async () => {
  const query = 'SELECT * FROM users'
  const result = await pool.query(query)
  return result.rows
}

const getUserByEmail = async email => {
  const query = 'SELECT * FROM users WHERE email = $1'
  const result = await pool.query(query, [email])
  return result.rows[0]
}

const updateUser = async (id, name, email, password, role) => {
  let query
  let values

  if (password) {
    // Si se proporciona una nueva contraseña, la incluimos en la consulta
    query = `
      UPDATE users
      SET name = $1, email = $2, password = $3, role = $4
      WHERE id_user = $5
      RETURNING *;
    `
    values = [name, email, password, role, id]
  } else {
    // Si no se proporciona una nueva contraseña, omitimos el campo password
    query = `
      UPDATE users
      SET name = $1, email = $2, role = $3
      WHERE id_user = $4
      RETURNING *;
    `
    values = [name, email, role, id]
  }

  const result = await pool.query(query, values)
  return result.rows[0]
}

const deleteUser = async id => {
  const query = 'DELETE FROM users WHERE id_user = $1 RETURNING *'
  const result = await pool.query(query, [id])
  return result.rows[0]
}

export default {
  createUser,
  getUserById,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser
}
