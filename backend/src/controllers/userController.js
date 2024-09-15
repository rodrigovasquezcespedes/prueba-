import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import Token from '../../utils/tokens.js'

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await userModel.getUserByEmail(email)
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Correo o contraseña incorrectos' })
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: 'Correo o contraseña incorrectos' })
    }

    // Generar el token utilizando la función de utils/token.js
    const token = Token.createToken(user) // El token incluirá el id, role y name

    // Opción 1: Enviar el token en una cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax'
    })

    // Opción 2: Enviar el token en el cuerpo de la respuesta JSON
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token, // También devolvemos el token al frontend
      user: { id: user.id_user, name: user.name, role: user.role } // Puedes devolver los datos del usuario si es necesario
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error })
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
