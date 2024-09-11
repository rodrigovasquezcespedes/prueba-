import { Router } from 'express'
import paymentController from '../controllers/paymentController.js'

const router = Router()

router.post('/', paymentController.createPayment)
router.get('/:id', paymentController.getPaymentById)
router.get('/', paymentController.getAllPayments)

export default router
