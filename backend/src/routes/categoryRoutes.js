import { Router } from 'express'
import categoryController from '../controllers/categoryController.js'
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/', verifyToken, isAdmin, categoryController.createCategory)
router.get('/:id', categoryController.getCategoryById)
router.get('/', categoryController.getAllCategories)
router.put('/:id', verifyToken, isAdmin, categoryController.updateCategory)
router.delete('/:id', verifyToken, isAdmin, categoryController.deleteCategory)

export default router
