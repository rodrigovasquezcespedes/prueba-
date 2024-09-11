import { Router } from 'express'
import productController from '../controllers/productController.js'

const router = Router()

router.post('/', productController.createProduct)
router.get('/:id', productController.getProductById)
router.get('/', productController.getAllProducts)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router
