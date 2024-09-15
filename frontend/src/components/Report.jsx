import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container, Spinner, Button } from 'react-bootstrap'
import axios from 'axios'
import { urlBaseServer } from '../config'
import jsPDF from 'jspdf'
import 'jspdf-autotable' // Para generar tablas automáticamente en PDF

const Report = () => {
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Obtener los datos del reporte desde la API
  const fetchReportData = async () => {
    try {
      const response = await axios.get(
        `${urlBaseServer}/api/dashboard/report`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        }
      )
      setReportData(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error al obtener los datos del reporte:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReportData()
  }, [])

  // Función para generar el PDF
  const generatePDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('Reporte del Dashboard', 14, 22)
    doc.setFontSize(12)
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30)

    // Crear tabla con los datos
    doc.autoTable({
      startY: 40,
      head: [['Descripción', 'Valor']],
      body: [
        ['Total de Usuarios', reportData?.totalUsers || 0],
        ['Total de Productos', reportData?.totalProducts || 0],
        ['Total de Ventas', reportData?.totalSales || 0],
        [
          'Total de Ingresos',
          `$${reportData?.totalRevenue?.toLocaleString() || '0'}`
        ],
        [
          'Usuarios Registrados Recientemente',
          reportData?.recentUsers?.length || 0
        ]
      ]
    })

    doc.save('reporte_dashboard.pdf') // Descargar el archivo PDF
  }

  if (loading) {
    return (
      <div className='text-center my-5'>
        <Spinner animation='border' />
      </div>
    )
  }

  return (
    <Container className='my-5'>
      <h2>Reporte del Dashboard</h2>
      {/* Botón para descargar el PDF */}
      <Button variant='primary' onClick={generatePDF} className='mb-4'>
        Descargar PDF
      </Button>

      <Row className='gy-4 mt-4'>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Usuarios</Card.Title>
              <Card.Text>{reportData?.totalUsers || 0} usuarios</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Productos</Card.Title>
              <Card.Text>{reportData?.totalProducts || 0} productos</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Ventas</Card.Title>
              <Card.Text>{reportData?.totalSales || 0} ventas</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='gy-4 mt-4'>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Ingresos</Card.Title>
              <Card.Text>
                ${reportData?.totalRevenue?.toLocaleString() || '0'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Usuarios Registrados Recientemente</Card.Title>
              <Card.Text>
                {reportData?.recentUsers?.length || 0} nuevos usuarios
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Report
