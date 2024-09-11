import pool from '../config/db.js'

const getAllProducts = async () => {
  const { rows } = await pool.query('SELECT * FROM products')
  return rows
}

const getProductById = async id => {
  const { rows } = await pool.query(
    'SELECT * FROM products WHERE id_product = $1',
    [id]
  )
  return rows[0]
}

const createProduct = async product => {
  const { name, description, price, stock, image_url, brand, id_category } =
    product
  const { rows } = await pool.query(
    'INSERT INTO products (name, description, price, stock, image_url, brand, id_category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [name, description, price, stock, image_url, brand, id_category]
  )
  return rows[0]
}

const updateProduct = async (id, product) => {
  const { name, description, price, stock, image_url, brand, id_category } =
    product
  const { rows } = await pool.query(
    'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image_url = $5, brand = $6, id_category = $7 WHERE id_product = $8 RETURNING *',
    [name, description, price, stock, image_url, brand, id_category, id]
  )
  return rows[0]
}

const deleteProduct = async id => {
  await pool.query('DELETE FROM products WHERE id_product = $1', [id])
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
