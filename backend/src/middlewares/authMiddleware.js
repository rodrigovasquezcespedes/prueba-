import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res
      .status(403)
      .json({ message: 'No hay token, autorización denegada' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido o expirado' })
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.role !== true) {
    return res
      .status(403)
      .json({ message: 'Acceso denegado, no eres administrador' })
  }
  next()
}

export { verifyToken, isAdmin }
