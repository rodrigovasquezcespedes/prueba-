import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const loginUser = async (req, res) => {
  const { email, password } = req.body
  console.log('Login datos recibidos:', email, password)
  try {
    const user = await userModel.getUserByEmail(email)
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Correo o contraseña incorrectos' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: 'Correo o contraseña incorrectos' })
    }

    const token = jwt.sign(
      { id: user.id_user, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
      maxAge: 3600000 // 1 hora
    })

    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: { id_user: user.id_user, name: user.name, role: user.role }
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión', error })
  }
}

const logoutUser = (req, res) => {
  res.clearCookie('token')
  return res.status(200).json({ message: 'Cierre de sesión exitoso' })
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
    const existingUser = await userModel.getUserById(id)

    if (!existingUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    console.log(
      'Contraseña actual (hashed) del usuario:',
      existingUser.password
    )

    let hashedPassword = existingUser.password

    if (password && password.trim() !== '') {
      hashedPassword = await bcrypt.hash(password, 10)
      console.log(
        'Nueva contraseña proporcionada y encriptada:',
        hashedPassword
      )
    }

    const updatedUser = await userModel.updateUser(
      id,
      name,
      email,
      hashedPassword,
      role
    )

    console.log('Contraseña después de la actualización:', hashedPassword)

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
  deleteUser,
  logoutUser
}
