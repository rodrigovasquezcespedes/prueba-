import bcrypt from 'bcrypt'
import pool from '../config/db.js'

const createUser = async (name, email, password, role) => {
  // Generar el hash de la contraseña
  const saltRounds = 10 // Número de rondas para generar el salt
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const query =
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *'
  const values = [name, email, hashedPassword, role] // Usamos la contraseña encriptada
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getUserById = async id => {
  const query = 'SELECT * FROM users WHERE id_user = $1'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getAllUsers = async () => {
  const query = 'SELECT * FROM users'
  const result = await pool.query(query)
  return result.rows
}

const updateUser = async (id, name, email, password, role) => {
  const query =
    'UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id_user = $5 RETURNING *'
  const values = [name, email, password, role, id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const deleteUser = async id => {
  const query = 'DELETE FROM users WHERE id_user = $1 RETURNING *'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
}
