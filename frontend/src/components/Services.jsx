import { Card, Row, Container } from 'react-bootstrap'

const Services = () => {
  return (
    <Container className='my-5'>
      <Row>
        <div className='col-12 col-sm-6 col-md-6 col-lg-3 mb-3'>
          <Card style={{ height: '20rem' }}>
            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
              <p><i className='fa-solid fa-truck fa-3x' /></p>
              <Card.Title>Despacho gratis</Card.Title>
              <Card.Text>Por compras superiores $50.000</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className='col-12 col-sm-6 col-md-6 col-lg-3 mb-3'>
          <Card style={{ height: '20rem' }}>
            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
              <p><i className='fa-solid fa-location-dot fa-3x' /></p>
              <Card.Title>Seguimiento</Card.Title>
              <Card.Text>Sigue tus pedidos</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className='col-12 col-sm-6 col-md-6 col-lg-3 mb-3'>
          <Card style={{ height: '20rem' }}>
            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
              <p><i className='fa-solid fa-bag-shopping fa-3x' /></p>
              <Card.Title>Mis compras</Card.Title>
              <Card.Text>Haz seguimiento de tus compras</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className='col-12 col-sm-6 col-md-6 col-lg-3 mb-3'>
          <Card style={{ height: '20rem' }}>
            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
              <p><i className='fa-solid fa-credit-card fa-3x' /></p>
              <Card.Title>Pago Flexible</Card.Title>
              <Card.Text>Compra hasta en 24 cuotas</Card.Text>
            </Card.Body>
          </Card>
        </div>

      </Row>
    </Container>
  )
}

export default Services
