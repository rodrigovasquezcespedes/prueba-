import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Card,
  Button,
  Toast,
  ToastContainer
} from 'react-bootstrap'
import axios from 'axios'
import { useCart } from '../context/CartContext' // Import the custom hook to use the cart
const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const Detail = () => {
  const { id } = useParams() // Obtener el ID del producto desde la URL
  const [productoDetail, setProductoDetail] = useState(null) // Iniciar como null para manejar estado de carga
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()

  const { addToCart } = useCart() // Get addToCart from CartContext

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`${urlBaseServer}/api/products/${id}`)
        setProductoDetail(response.data) // Cargar el producto específico desde la base de datos
      } catch (error) {
        console.error('Error fetching product:', error)
        navigate('/products') // Redirigir si no se encuentra el producto
      }
    }

    fetchProducto()
  }, [id, navigate])

  const handleAddToCart = () => {
    if (productoDetail) {
      // Add only relevant product details to the cart
      const productToAdd = {
        id_product: productoDetail.id_product,
        name: productoDetail.name,
        price: productoDetail.price,
        image_url: productoDetail.image_url,
        quantity: 1 // Always start with a quantity of 1 when adding
      }
      addToCart(productToAdd) // Add the specific product to the cart
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
                src={
                  productoDetail.image_url || 'https://via.placeholder.com/200'
                }
                alt={productoDetail.name}
              />
            </Card>
            <Card className='col-md-6'>
              <Card.Body>
                <Card.Title>{productoDetail.name}</Card.Title>
                <Card.Text>Marca: {productoDetail.brand}</Card.Text>
                <Card.Text>Descripción: {productoDetail.description}</Card.Text>
                <Card.Text>
                  Precio: ${productoDetail.price.toLocaleString()}
                </Card.Text>
                <ul>
                  {productoDetail.specifications &&
                    productoDetail.specifications.map((spec, index) => (
                      <li key={index}>
                        <strong>{spec.name}:</strong> {spec.value}
                      </li>
                    ))}
                </ul>
                <div className='d-flex justify-content-center gap-2'>
                  <Button onClick={() => navigate('/products')} variant='dark'>
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
        </Row>
      </Container>

      {/* Toast para mostrar notificación */}
      <ToastContainer position='top-end' className='p-3'>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className='me-auto'>Carrito</strong>
          </Toast.Header>
          <Toast.Body>Producto añadido al carrito con éxito!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

export default Detail
