import express from 'express'
import orderController from '../controllers/orderController.js'

const router = express.Router()

router.get('/:userId', orderController.getOrders)
router.get('/:id/order', orderController.getOrder)
router.post('/', orderController.createOrder)
router.put('/:id', orderController.updateOrderStatus)
router.delete('/:id', orderController.deleteOrder)

export default router
