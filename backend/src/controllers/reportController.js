import reportModel from '../models/reportModel.js'

export const getReport = async (req, res) => {
  try {
    const reportData = await reportModel.getReportData()
    res.status(200).json(reportData)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener el reporte', error: error.message })
  }
}
