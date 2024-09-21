import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'
import reportRoutes from './routes/reportRoutes.js'

const app = express()

dotenv.config()

const allowedOrigins = process.env.CORS_ORIGIN.split(',')

const corsOptions = {
  origin: function (origin, callback) {
    // Si no hay origen (por ejemplo, en desarrollo con herramientas como Postman) o el origen está permitido
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true) // Permitir el origen
    } else {
      callback(new Error('No permitido por CORS'))
    }
  },
  credentials: true // Habilitar credenciales para el envío de cookies
}

app.use(cors(corsOptions))

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/dashboard', reportRoutes)

export default app
