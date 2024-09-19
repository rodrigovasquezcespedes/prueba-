import { Router } from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js'
import favoriteController from '../controllers/favoriteController.js'

const router = Router()

router.post('/', verifyToken, favoriteController.addFavorite)
router.get('/:idUser', verifyToken, favoriteController.getFavoritesByUserId)
router.delete('/:idFavorite', verifyToken, favoriteController.removeFavorite)

export default router
