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
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null
  const query = `UPDATE users SET
                  name = COALESCE($1, name),
                  email = COALESCE($2, email),
                  password = COALESCE($3, password),
                  role = COALESCE($4, role)
                WHERE id_user = $5 RETURNING *`
  const values = [name, email, hashedPassword, role, id]
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
