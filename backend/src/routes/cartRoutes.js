import { Router } from 'express'
import cartController from '../controllers/cartController.js'

const router = Router()

router.post('/', cartController.createCart)
router.get('/:id_user', cartController.getCartByUserId)
router.post('/items', cartController.addItemToCart)
router.delete('/items/:id_cart_item', cartController.removeItemFromCart)

export default router
