import { Router } from 'express'
import favoriteController from '../controllers/favoriteController.js'

const router = Router()

router.post('/', favoriteController.addFavorite)
router.get('/:id_user', favoriteController.getFavoritesByUserId)
router.delete('/:id_favorite', favoriteController.removeFavorite)

export default router
