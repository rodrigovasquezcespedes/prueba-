import dotenv from 'dotenv'
import app from './src/app.js'

dotenv.config()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
