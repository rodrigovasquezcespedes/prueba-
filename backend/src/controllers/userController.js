import userModel from '../models/userModel.js'

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body
  try {
    const user = await userModel.createUser(name, email, password, role)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error })
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await userModel.getUserById(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error })
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { name, email, password, role } = req.body
  try {
    const updatedUser = await userModel.updateUser(
      id,
      name,
      email,
      password,
      role
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const deletedUser = await userModel.deleteUser(id)
    res.status(200).json(deletedUser)
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error })
  }
}

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
}
