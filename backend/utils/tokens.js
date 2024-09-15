import jwt from 'jsonwebtoken'

// Función para generar el token con el nombre del usuario
const createToken = user => {
  const token = jwt.sign(
    {
      id: user.id_user,
      role: user.role,
      name: user.name // Agregamos el nombre al token
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30m' // Token válido por 30 minutos
    }
  )

  return token
}

// Función para verificar el token
const verifyToken = token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw new Error('Token inválido o expirado')
  }
}
export default { createToken, verifyToken }
