import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err)
  } else {
    console.log('Base de datos conectada en:', res.rows)
  }
})

export default pool
