import pool from '../config/db.js'

const getAllCategories = async () => {
  const { rows } = await pool.query('SELECT * FROM categories')
  return rows
}

const getCategoryById = async id => {
  const { rows } = await pool.query(
    'SELECT * FROM categories WHERE id_category = $1',
    [id]
  )
  return rows[0]
}

const createCategory = async category => {
  const { category_name } = category
  const { rows } = await pool.query(
    'INSERT INTO categories (category_name) VALUES ($1) RETURNING *',
    [category_name]
  )
  return rows[0]
}

const updateCategory = async (id, category) => {
  const { category_name } = category
  const { rows } = await pool.query(
    'UPDATE categories SET category_name = $1 WHERE id_category = $2 RETURNING *',
    [category_name, id]
  )
  return rows[0]
}

const deleteCategory = async id => {
  await pool.query('DELETE FROM categories WHERE id_category = $1', [id])
}

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}
