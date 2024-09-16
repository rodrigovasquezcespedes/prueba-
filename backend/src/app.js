import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'

const app = express()

dotenv.config()

const corsOptions = {
  origin: 'https://frontend-q785.onrender.com',
  credentials: true // Si necesitas pasar cookies o autenticación
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/favorites', favoriteRoutes)

export default app
