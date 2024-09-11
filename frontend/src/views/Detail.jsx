import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import { TecnoContext } from '../context/TecnoContext'
import {
  Container,
  Row,
  Card,
  Button,
  Toast,
  ToastContainer
} from 'react-bootstrap'

const Detail = () => {
  const { id } = useParams() // Obtener el ID del producto desde la URL
  const { productos, agregarProducto } = useContext(TecnoContext)
  const [productoDetail, setProductoDetail] = useState(null) // Iniciar como null para manejar estado de carga
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = () => {
      if (productos.length === 0) {
        return // Evitar búsqueda si productos no están cargados
      }
      const informacion = productos.find(producto => producto.id === id)
      if (informacion) {
        setProductoDetail(informacion)
      } else {
        navigate('/productos') // Redirigir si el producto no se encuentra
      }
    }

    getData()
  }, [productos, id, navigate]) // Dependencias actualizadas para ejecutar cuando cambian productos o id

  const handleAddToCart = () => {
    if (productoDetail) {
      agregarProducto(productoDetail)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  if (productoDetail === null) {
    return <div>Cargando...</div> // Mostrar mensaje de carga mientras se obtiene el producto
  }

  return (
    <>
      <Container className='my-5'>
        <Row>
          <div className='d-flex flex-column flex-md-row'>
            <Card className='col-md-6'>
              <Card.Img
                className='imagen-card'
                variant='top'
                src={productoDetail.img}
              />
            </Card>
            <Card className='col-md-6'>
              <Card.Body>
                <Card.Title>{productoDetail.nombre}</Card.Title>
                <Card.Text>{productoDetail.marca}</Card.Text>
                <Card.Text>{productoDetail.desc}</Card.Text>
                <Card.Text>{productoDetail.precio}</Card.Text>
                <ul>
                  {productoDetail.especificaciones &&
                    productoDetail.especificaciones.map(
                      (especificacion, index) => {
                        const [key, value] = Object.entries(especificacion)[0]
                        return (
                          <li key={index}>
                            <strong>{key}:</strong> {value}
                          </li>
                        )
                      }
                    )}
                </ul>
                <div className='d-flex justify-content-center gap-2'>
                  <Button onClick={() => navigate('/productos')} variant='dark'>
                    Regresar
                  </Button>
                  <Button
                    className='px-3'
                    onClick={handleAddToCart}
                    variant='dark'
                  >
                    Añadir
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <ToastContainer position='top-end' className='p-3'>
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={3000}
              autohide
            >
              <Toast.Body>El producto se ha agregado al carrito!</Toast.Body>
            </Toast>
          </ToastContainer>
        </Row>
      </Container>
    </>
  )
}

export default Detail
