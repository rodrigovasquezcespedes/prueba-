import { Router } from 'express'
import orderController from '../controllers/orderController.js'

const router = Router()

router.post('/pay', orderController.processPayment)

export default router
