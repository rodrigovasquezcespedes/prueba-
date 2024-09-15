import productModel from '../models/productModel.js'

const createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl, brand, idCategory } =
    req.body
  try {
    const product = await productModel.createProduct(
      name,
      description,
      price,
      stock,
      imageUrl,
      brand,
      idCategory
    )
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error })
  }
}

const getProductById = async (req, res) => {
  const { id } = req.params
  try {
    const product = await productModel.getProductById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error })
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error })
  }
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, price, stock, imageUrl, brand, idCategory } =
    req.body
  try {
    const updatedProduct = await productModel.updateProduct(
      id,
      name,
      description,
      price,
      stock,
      imageUrl,
      brand,
      idCategory
    )
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error })
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const deletedProduct = await productModel.deleteProduct(id)
    res.status(200).json(deletedProduct)
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error })
  }
}

export default {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct
}
