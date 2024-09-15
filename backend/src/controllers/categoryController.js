import categoryModel from '../models/categoryModel.js'

const createCategory = async (req, res) => {
  const { categoryName } = req.body
  try {
    const category = await categoryModel.createCategory(categoryName)
    res.status(201).json(category)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoría', error })
  }
}

const getCategoryById = async (req, res) => {
  const { id } = req.params
  try {
    const category = await categoryModel.getCategoryById(id)
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoría', error })
  }
}

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error })
  }
}

const updateCategory = async (req, res) => {
  const { id } = req.params
  const { categoryName } = req.body
  try {
    const updatedCategory = await categoryModel.updateCategory(
      id,
      categoryName
    )
    res.status(200).json(updatedCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la categoría', error })
  }
}

const deleteCategory = async (req, res) => {
  const { id } = req.params
  try {
    const deletedCategory = await categoryModel.deleteCategory(id)
    res.status(200).json(deletedCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error })
  }
}

export default {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory
}
