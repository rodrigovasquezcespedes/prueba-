import pool from '../config/db.js'

const getAllUsers = async () => {
  const { rows } = await pool.query('SELECT * FROM users')
  return rows
}

const getUserById = async id => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id_user = $1', [
    id
  ])
  return rows[0]
}

const createUser = async user => {
  const { name, email, password, role } = user
  const { rows } = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, role]
  )
  return rows[0]
}

const updateUser = async (id, user) => {
  const { name, email, password, role } = user
  const { rows } = await pool.query(
    'UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id_user = $5 RETURNING *',
    [name, email, password, role, id]
  )
  return rows[0]
}

const deleteUser = async id => {
  await pool.query('DELETE FROM users WHERE id_user = $1', [id])
}

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser }
