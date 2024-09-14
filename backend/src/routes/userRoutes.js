import express from 'express'
import userController from '../controllers/userController.js'
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// CRUD de usuarios
router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/', verifyToken, isAdmin, userController.getAllUsers)
router.get('/:id', verifyToken, isAdmin, userController.getUserById)
router.put('/:id', verifyToken, isAdmin, userController.updateUser)
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser)

export default router
