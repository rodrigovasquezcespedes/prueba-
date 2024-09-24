import { Router } from 'express'
import orderController from '../controllers/orderController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/pay', verifyToken, orderController.processOrder)
router.get('/user/:userId', verifyToken, orderController.getUserOrders)

export default router
