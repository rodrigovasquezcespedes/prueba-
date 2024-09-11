import { Router } from 'express'
import orderController from '../controllers/orderController.js'

const router = Router()

router.post('/', orderController.createOrder)
router.get('/:id', orderController.getOrderById)
router.get('/', orderController.getAllOrders)
router.put('/:id', orderController.updateOrderStatus)
router.delete('/:id', orderController.deleteOrder)

export default router
