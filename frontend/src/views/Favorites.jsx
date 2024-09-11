import { Container, Row, Card, Button } from 'react-bootstrap'
import { TecnoContext } from '../context/TecnoContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Favorites = () => {
  const { productos, addAndRemoveFavorite } = useContext(TecnoContext)
  const navigate = useNavigate()

  useEffect(() => {
    const favoritos = productos.filter(producto => producto.like)
    if (favoritos.length === 0) {
      Swal.fire({
        title: 'No hay productos favoritos',
        text: 'Aún no has añadido ningún producto a tus favoritos.',
        icon: 'info',
        confirmButtonText: 'OK'
      })
    }
  }, [productos])

  return (
    <Container className='py-5'>
      <Row className='shadow rounded p-3'>
        <h2 className='my-5'>Mis productos favoritos</h2>
        {productos &&
          productos.filter(producto => producto.like).map(producto => (
            <div key={producto.id} className='col-12 col-md-6 col-lg-3 mb-5 text-center'>
              <Card>
                <Card.Img variant='top' src={producto.img} />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Title>{producto.marca}</Card.Title>
                  <Card.Text>$ {producto.precio}</Card.Text>
                  <div className='d-flex flex-column gap-3'>
                    <span onClick={() => addAndRemoveFavorite(producto.id)}>
                      {/* SVG del corazón */}
                    </span>
                    <Button className='mx-5' onClick={() => navigate(`/productos/${producto.id}`)} variant='dark'>Ver más</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
      </Row>
    </Container>
  )
}

export default Favorites
