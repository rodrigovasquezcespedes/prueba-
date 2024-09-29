import express from 'express'
import userController from '../controllers/userController.js'
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)

router.get('/dashboard', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: 'Bienvenido al Dashboard' })
})
router.get('/', verifyToken, isAdmin, userController.getAllUsers)
router.get('/:id', verifyToken, isAdmin, userController.getUserById)
router.put('/:id', verifyToken, isAdmin, userController.updateUser)
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser)

export default router
