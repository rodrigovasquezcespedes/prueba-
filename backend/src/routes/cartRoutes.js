import express from 'express'
import cartController from '../controllers/cartController.js'

const router = express.Router()

router.get('/:userId', cartController.getCart)
router.post('/:userId', cartController.createCart)
router.post('/:userId/items', cartController.addItem)
router.put('/:userId/items', cartController.updateItem)
router.delete('/:userId/items/:productId', cartController.removeItem)
router.delete('/:userId', cartController.deleteCart)

export default router
