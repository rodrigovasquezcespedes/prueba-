import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await userModel.getUserByEmail(email)
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Correo o contraseña incorrectos' })
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: 'Correo o contraseña incorrectos' })
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id_user, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '30m' // Token válido por 30 minutos
      }
    )

    // Enviar el token como una cookie
    res.cookie('token', token, {
      httpOnly: true, // Asegura que la cookie no sea accesible desde el frontend
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      maxAge: 30 * 60 * 1000, // Expira en 30 minutos
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax' // Misma política de sitio
    })

    res.status(200).json({ message: 'Inicio de sesión exitoso' })
  } catch (error) {
    res.status(500).json({ message: ' backend Error al iniciar sesión', error })
  }
}

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    const user = await userModel.createUser(name, email, password, role)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error })
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

const getUserById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await userModel.getUserById(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error })
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
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
