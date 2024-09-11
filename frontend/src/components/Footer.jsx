import { Card, Row, Container } from 'react-bootstrap'
import { FaSquareXTwitter, FaSquareFacebook, FaSquareInstagram } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className='footer mt-auto bg-dark text-light'>
      <Container>
        <Row className='d-flex justify-content-center align-items-center py-4'>
          <div className='col-12 col-md-3 mb-3 mb-md-0'>
            <Card className='border-0 card-footer bg-dark text-light'>
              <Card.Body>
                <Card.Text>Política de cambios</Card.Text>
                <Card.Text>Centro de ayuda</Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className='col-12 col-md-3 mb-3 mb-md-0'>
            <Card className='border-0 card-footer bg-dark text-light'>
              <Card.Body>
                <Card.Text>Términos y condiciones</Card.Text>
                <Card.Text>Política de privacidad</Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className='col-12 col-md-3'>
            <Card className='border-0 card-footer bg-dark text-light'>
              <Card.Body className='d-flex justify-content-center'>
                <Card.Text className='mx-1'><FaSquareXTwitter /></Card.Text>
                <Card.Text className='mx-1'><FaSquareFacebook /></Card.Text>
                <Card.Text className='mx-1'><FaSquareInstagram /></Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
