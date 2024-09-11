import express from 'express'
import {
  getPayments,
  getPayment,
  createPayment,
  updatePaymentStatus,
  deletePayment
} from '../controllers/paymentController.js'

const router = express.Router()

router.get('/:userId', getPayments)
router.get('/:id/payment', getPayment)
router.post('/', createPayment)
router.put('/:id', updatePaymentStatus)
router.delete('/:id', deletePayment)

export default router
