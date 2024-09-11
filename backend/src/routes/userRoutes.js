import { Router } from 'express'
import userController from '../controllers/userController.js'

const router = Router()

router.post('/', userController.createUser)
router.get('/:id', userController.getUserById)
router.get('/', userController.getAllUsers)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router
