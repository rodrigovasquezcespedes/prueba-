import { Router } from 'express'
import productController from '../controllers/productController.js'
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/', verifyToken, isAdmin, productController.createProduct)
router.get('/:id', productController.getProductById)
router.get('/', productController.getAllProducts)
router.put('/:id', verifyToken, isAdmin, productController.updateProduct)
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct)

export default router
