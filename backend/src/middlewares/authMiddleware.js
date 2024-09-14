import jwt from 'jsonwebtoken'

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  let token

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]
  }

  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Guardar los datos del usuario en req.user
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' })
  }
}

// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    return res.status(403).json({ message: 'Acceso denegado. No eres administrador.' })
  }
}

export { verifyToken, isAdmin }
