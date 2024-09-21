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

app.use(
  cors({
    origin: ['https://frontend-q785.onrender.com', 'http://localhost:5173'],
    credentials: true
  })
)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

// Rutas
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/dashboard', reportRoutes)

export default app
