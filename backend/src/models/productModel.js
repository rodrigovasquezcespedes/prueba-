import pool from '../config/db.js'

// Crear un producto con sus especificaciones
const createProduct = async (
  name,
  description,
  price,
  stock,
  imageUrl,
  brand,
  idCategory,
  specifications
) => {
  const { rows: product } = await pool.query(
    'INSERT INTO products (name, description, price, stock, image_url, brand, id_category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [name, description, price, stock, imageUrl, brand, idCategory]
  )

  if (specifications.length > 0) {
    const specQuery =
      'INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES ($1, $2, $3)'
    specifications.forEach(async spec => {
      await pool.query(specQuery, [
        product[0].id_product,
        spec.spec_name,
        spec.spec_value
      ])
    })
  }

  return product[0]
}

// Obtener un producto con sus especificaciones
const getProductById = async id => {
  const { rows: product } = await pool.query(
    'SELECT * FROM products WHERE id_product = $1',
    [id]
  )
  const { rows: specifications } = await pool.query(
    'SELECT spec_name, spec_value FROM product_specifications WHERE id_product = $1',
    [id]
  )

  product[0].specifications = specifications
  return product[0]
}

// Obtener todos los productos con sus especificaciones
const getAllProducts = async () => {
  const { rows: products } = await pool.query('SELECT * FROM products')

  for (const product of products) {
    const { rows: specifications } = await pool.query(
      'SELECT spec_name, spec_value FROM product_specifications WHERE id_product = $1',
      [product.id_product]
    )
    product.specifications = specifications
  }

  return products
}

// Actualizar un producto y sus especificaciones
const updateProduct = async (
  id,
  name,
  description,
  price,
  stock,
  imageUrl,
  brand,
  idCategory,
  specifications
) => {
  const { rows: product } = await pool.query(
    'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image_url = $5, brand = $6, id_category = $7 WHERE id_product = $8 RETURNING *',
    [name, description, price, stock, imageUrl, brand, idCategory, id]
  )

  await pool.query('DELETE FROM product_specifications WHERE id_product = $1', [
    id
  ])

  const specQuery =
    'INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES ($1, $2, $3)'
  specifications.forEach(async spec => {
    await pool.query(specQuery, [id, spec.spec_name, spec.spec_value])
  })

  return product[0]
}

// Eliminar un producto y sus especificaciones
const deleteProduct = async id => {
  await pool.query('DELETE FROM product_specifications WHERE id_product = $1', [
    id
  ])
  const { rows: product } = await pool.query(
    'DELETE FROM products WHERE id_product = $1 RETURNING *',
    [id]
  )

  return product[0]
}

export default {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct
}
