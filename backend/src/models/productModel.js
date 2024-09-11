import pool from '../config/db.js'

const createProduct = async (
  name,
  description,
  price,
  stock,
  image_url,
  brand,
  id_category
) => {
  const query =
    'INSERT INTO products (name, description, price, stock, image_url, brand, id_category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
  const values = [
    name,
    description,
    price,
    stock,
    image_url,
    brand,
    id_category
  ]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getProductById = async id => {
  const query = 'SELECT * FROM products WHERE id_product = $1'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getAllProducts = async () => {
  const query = 'SELECT * FROM products'
  const result = await pool.query(query)
  return result.rows
}

const updateProduct = async (
  id,
  name,
  description,
  price,
  stock,
  image_url,
  brand,
  id_category
) => {
  const query =
    'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image_url = $5, brand = $6, id_category = $7 WHERE id_product = $8 RETURNING *'
  const values = [
    name,
    description,
    price,
    stock,
    image_url,
    brand,
    id_category,
    id
  ]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const deleteProduct = async id => {
  const query = 'DELETE FROM products WHERE id_product = $1 RETURNING *'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

export default {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct
}
