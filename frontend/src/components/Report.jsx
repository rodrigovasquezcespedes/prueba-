import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container, Spinner, Button } from 'react-bootstrap'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const Report = () => {
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Obtener los datos del reporte desde la API
  const fetchReportData = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/dashboard/report`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
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
        ['Total de Ingresos', `$${reportData?.totalRevenue?.toLocaleString() || '0'}`],
        ['Usuarios Registrados Recientemente', reportData?.recentUsers?.length || 0]
      ]
    })

    // Añadir tabla de productos más guardados como favoritos
    if (reportData?.topFavoriteProducts?.length > 0) {
      doc.text('Productos más guardados como favoritos:', 14, doc.autoTable.previous.finalY + 10)
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 15,
        head: [['Producto', 'Veces Favorito']],
        body: reportData.topFavoriteProducts.map(product => [product.name, product.favoriteCount])
      })
    }

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

      {/* Mostrar los productos más guardados como favoritos */}
      {reportData?.topFavoriteProducts?.length > 0 && (
        <Row className='gy-4 mt-4'>
          <Col>
            <h3>Productos más guardados como favoritos</h3>
            <ul>
              {reportData.topFavoriteProducts.map(product => (
                <li key={product.id_product}>
                  {product.name} - Guardado {product.favoriteCount} veces
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Report
