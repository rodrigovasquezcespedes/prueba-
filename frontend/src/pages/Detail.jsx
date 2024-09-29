import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Card,
  Button
} from 'react-bootstrap'
import axios from 'axios'
import { useCart } from '../context/CartContext'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const Detail = () => {
  const { id } = useParams()
  const [productoDetail, setProductoDetail] = useState(null)
  const navigate = useNavigate()

  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`${urlBaseServer}/api/products/${id}`)
        setProductoDetail(response.data)
      } catch (error) {
        console.error('Error fetching product:', error)
        navigate('/products')
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
        quantity: 1
      }
      addToCart(productToAdd)
    }
  }

  if (productoDetail === null) {
    return <div>Cargando...</div>
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
                <Card.Text className='fs-4'>
                  Precio: ${productoDetail.price.toLocaleString()}
                </Card.Text>
                {productoDetail.specifications && productoDetail.specifications.length > 0 && (
                  <div>
                    <h5>Especificaciones:</h5>
                    <ul>
                      {productoDetail.specifications.map((spec, index) => (
                        <li key={index}>
                          {spec.spec_name}: {spec.spec_value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
    </>
  )
}

export default Detail
