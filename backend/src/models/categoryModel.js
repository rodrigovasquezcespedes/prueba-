import pool from '../config/db.js'

const createCategory = async category_name => {
  const query = 'INSERT INTO categories (category_name) VALUES ($1) RETURNING *'
  const values = [category_name]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getCategoryById = async id => {
  const query = 'SELECT * FROM categories WHERE id_category = $1'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getAllCategories = async () => {
  const query = 'SELECT * FROM categories'
  const result = await pool.query(query)
  return result.rows
}

const updateCategory = async (id, category_name) => {
  const query =
    'UPDATE categories SET category_name = $1 WHERE id_category = $2 RETURNING *'
  const values = [category_name, id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const deleteCategory = async id => {
  const query = 'DELETE FROM categories WHERE id_category = $1 RETURNING *'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

export default {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory
}
