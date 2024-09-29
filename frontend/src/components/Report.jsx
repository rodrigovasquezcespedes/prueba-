import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container, Spinner, Button } from 'react-bootstrap'
import axios from 'axios'
import { jsPDF as JsPdf } from 'jspdf'
import 'jspdf-autotable'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const Report = () => {
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Obtener los datos del reporte desde la API
  const fetchReportData = async () => {
    try {
      const response = await axios.get(
        `${urlBaseServer}/api/dashboard/report`,
        {
          withCredentials: true // Ensure cookies are sent and handled
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

  const generatePDF = () => {
    const doc = new JsPdf()

    // Título del reporte
    doc.setFontSize(18)
    doc.text('Reporte del Dashboard', 14, 22)

    // Fecha
    doc.setFontSize(12)
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30)

    // Tabla principal
    doc.autoTable({
      startY: 40,
      head: [['Descripción', 'Valor']],
      body: [
        [
          'Total de Usuarios',
          Number(reportData?.totalUsers || 0).toLocaleString('es-ES')
        ],
        [
          'Total de Productos',
          Number(reportData?.totalProducts || 0).toLocaleString('es-ES')
        ],
        [
          'Total de Ventas',
          Number(reportData?.totalSales || 0).toLocaleString('es-ES')
        ],
        [
          'Total de Ingresos',
          `$${Number(reportData?.totalRevenue || 0).toLocaleString('es-ES')}`
        ],
        [
          'Usuarios Registrados Recientemente',
          Number(reportData?.recentUsers?.length || 0).toLocaleString('es-ES')
        ]
      ]
    })

    // Verificar si hay productos favoritos
    if (reportData?.topFavoriteProducts?.length > 0) {
      doc.text(
        'Productos más guardados como favoritos:',
        14,
        doc.autoTable.previous.finalY + 10
      )

      // Añadir tabla de productos favoritos
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 15,
        head: [['Producto']],
        body: reportData.topFavoriteProducts.map(product => [
          product.name,
          product.favoriteCount
            ? Number(product.favoriteCount).toLocaleString('es-ES')
            : 'No disponible'
        ])
      })
    } else {
      doc.text(
        'No hay productos favoritos disponibles.',
        14,
        doc.autoTable.previous.finalY + 10
      )
    }

    // Guardar el PDF
    doc.save('reporte_dashboard.pdf')
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
              <Card.Text>
                {Number(reportData?.totalUsers || 0).toLocaleString('es-ES')}{' '}
                usuarios
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Productos</Card.Title>
              <Card.Text>
                {Number(reportData?.totalProducts || 0).toLocaleString('es-ES')}{' '}
                productos
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Ventas</Card.Title>
              <Card.Text>
                {Number(reportData?.totalSales || 0).toLocaleString('es-ES')}{' '}
                ventas
              </Card.Text>
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
                ${Number(reportData?.totalRevenue || 0).toLocaleString('es-ES')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Usuarios Registrados Recientemente</Card.Title>
              <Card.Text>
                {Number(reportData?.recentUsers?.length || 0).toLocaleString(
                  'es-ES'
                )}{' '}
                nuevos usuarios
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Mostrar los productos más guardados como favoritos en un Card */}
      {reportData?.topFavoriteProducts?.length > 0 && (
        <Row className='gy-4 mt-4'>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Productos más guardados como favoritos</Card.Title>
                <ul>
                  {reportData.topFavoriteProducts.map(product => (
                    <li key={product.id_product}>{product.name}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Report
