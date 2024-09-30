import React, { useContext } from 'react'
import { useCart } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Container,
  ListGroup,
  Row,
  Col,
  Image,
  Form,
  Card,
  Stack
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const ShoppingCart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, deleteFromCart } =
    useCart()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  let totalPrice = 0
  cartItems.forEach(item => {
    totalPrice += item.price * item.quantity
  })

  const handlePayment = async () => {
    if (!user) {
      Swal.fire({
        title: 'No estás logueado',
        text: 'Debes iniciar sesión para poder realizar el pago.',
        icon: 'warning',
        confirmButtonText: 'Iniciar sesión'
      }).then(() => {
        navigate('/login')
      })
      return
    }

    if (cartItems.length === 0) {
      Swal.fire({
        title: 'Carrito vacío',
        text: 'No tienes productos en tu carrito.',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return
    }

    try {
      console.log('Enviando userId:', user.id_user)

      const response = await axios.post(
        `${urlBaseServer}/api/orders/pay`,
        {
          idUser: user.id_user,
          items: cartItems,
          paymentMethod: 'tarjeta de crédito'
        },
        {
          withCredentials: true
        }
      )

      if (response.status === 201) {
        Swal.fire({
          title: 'Pago Exitoso',
          text: 'Tu pago ha sido procesado con éxito.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          clearCart()
          navigate('/products')
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al procesar el pago.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al procesar el pago. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  return (
    <Container className='my-5'>
      <h2 className='text-center mb-4'>Tu Carrito de Compras</h2>

      {cartItems.length === 0 && (
        <div className='text-center'>
          <FaShoppingCart size={80} className='text-muted mb-3' />
          <h4 className='text-muted'>Tu carrito está vacío</h4>
          <p className='text-muted'>
            ¡Explora nuestros productos y agrega algunos a tu carrito!
          </p>
          <Button
            variant='primary'
            onClick={() => navigate('/products')}
            className='mt-3'
          >
            Volver a productos
          </Button>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.id_product} className='mb-3'>
                <Card className='p-3 shadow-sm'>
                  <Row className='align-items-center'>
                    <Col md={2}>
                      <Image
                        src={
                          item.image_url || 'https://via.placeholder.com/100'
                        }
                        alt={item.name}
                        fluid
                        rounded
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover'
                        }}
                      />
                    </Col>

                    <Col md={4}>
                      <h5 className='mb-0'>{item.name}</h5>
                      <p className='text-muted'>
                        Precio: ${item.price.toLocaleString()}
                      </p>
                    </Col>

                    <Col md={3} className='d-flex align-items-center'>
                      <Button
                        variant='outline-secondary'
                        className='me-2'
                        onClick={() => removeFromCart(item.id_product)}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </Button>
                      <Form.Control
                        type='text'
                        value={item.quantity}
                        readOnly
                        className='text-center'
                        style={{ width: '50px' }}
                      />
                      <Button
                        variant='outline-primary'
                        className='ms-2'
                        onClick={() => addToCart(item)}
                      >
                        <FaPlus />
                      </Button>
                    </Col>

                    <Col md={3}>
                      <Button
                        variant='outline-danger'
                        onClick={() => deleteFromCart(item.id_product)}
                      >
                        <FaTrash /> Eliminar
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Card className='p-3 mt-4 shadow-sm'>
            <h4 className='text-center'>
              Total: ${totalPrice.toLocaleString()}
            </h4>
            <Stack
              direction='horizontal'
              gap={3}
              className='justify-content-between mt-3'
            >
              <Button variant='warning' onClick={clearCart}>
                Vaciar Carrito
              </Button>
              <Button
                variant='success'
                onClick={handlePayment}
                disabled={cartItems.length === 0}
              >
                Pagar
              </Button>
            </Stack>
          </Card>
        </>
      )}
    </Container>
  )
}

export default ShoppingCart
