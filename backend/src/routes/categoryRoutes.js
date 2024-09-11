import { Router } from 'express'
import categoryController from '../controllers/categoryController.js'

const router = Router()

router.post('/', categoryController.createCategory)
router.get('/:id', categoryController.getCategoryById)
router.get('/', categoryController.getAllCategories)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

export default router
