import express from 'express'
import { getReport } from '../controllers/reportController.js'

const router = express.Router()

// Ruta para obtener el reporte
router.get('/report', getReport)

export default router
