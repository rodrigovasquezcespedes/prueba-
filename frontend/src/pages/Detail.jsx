import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Row, Card, Button, Spinner, Table } from 'react-bootstrap'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { FaCartPlus } from 'react-icons/fa' // Importa el icono correcto

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
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '60vh' }}
      >
        <Spinner animation='border' variant='primary' />
      </div>
    )
  }

  return (
    <Container className='my-5'>
      <Row>
        <div className='d-flex flex-column flex-md-row align-items-center'>
          <Card className='col-md-6 mb-2 shadow-lg'>
            <Card.Img
              className='imagen-card'
              variant='top'
              src={
                productoDetail.image_url || 'https://via.placeholder.com/200'
              }
              alt={productoDetail.name}
            />
          </Card>
          <Card className='col-md-6 mb-2 shadow-lg'>
            <Card.Body>
              <Card.Title className='fs-2 text-primary'>{productoDetail.name}</Card.Title>
              <Card.Text>
                Marca: <strong>{productoDetail.brand}</strong>
              </Card.Text>
              <Card.Text>Descripción: {productoDetail.description}</Card.Text>
              <Card.Text className='fs-3 text-danger'>
                Precio: ${productoDetail.price.toLocaleString()}
              </Card.Text>
              {productoDetail.specifications &&
                productoDetail.specifications.length > 0 && (
                  <div className='mt-4'>
                    <h5>Especificaciones:</h5>
                    <Table striped bordered hover>
                      <tbody>
                        {productoDetail.specifications.map((spec, index) => (
                          <tr key={index}>
                            <td>{spec.spec_name}</td>
                            <td>{spec.spec_value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
              )}
              <div className='d-flex justify-content-center gap-3 mt-4'>
                <Button
                  onClick={() => navigate('/products')}
                  variant='outline-dark'
                >
                  Regresar
                </Button>
                <Button
                  onClick={handleAddToCart}
                  variant='primary'
                  className='w-25 ms-2'
                  style={{ padding: '0.5rem' }}
                >
                  <FaCartPlus size={18} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  )
}

export default Detail
