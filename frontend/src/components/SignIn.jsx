import { Card, Row, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()

  return (
    <Container className='mt-5'>
      <Row>
        <Card style={{ height: '10rem' }}>
          <Card.Body className='d-flex justify-content-between align-items-center px-4'>
            <div className='d-flex align-items-center gap-3'>
              <p><i className='fa-solid fa-user fa-3x' /></p>
              <Card.Title>Inicia sesión para mejorar tu experiencia de compra</Card.Title>
            </div>
            <div>
              <Button onClick={() => navigate('/login')} className='mt-3 px-5' variant='dark'>Login</Button>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default SignIn
