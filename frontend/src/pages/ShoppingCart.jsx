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
  Form
} from 'react-bootstrap'
import Swal from 'sweetalert2'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const ShoppingCart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, deleteFromCart } =
    useCart()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  // Calcular el precio total de todos los productos en el carrito
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
        `${urlBaseServer}/api/orders/pay`, // Corregir la URL si es necesario
        {
          idUser: user.id_user, // Enviar id_user del usuario autenticado
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
      <h2>Tu Carrito de Compras</h2>

      {cartItems.length === 0 && <p>Tu carrito está vacío</p>}

      {cartItems.length > 0 && (
        <>
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.id_product} className='mb-3'>
                <Row className='align-items-center'>
                  <Col md={2}>
                    <Image
                      src={item.image_url || 'https://via.placeholder.com/100'}
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
                    <h5>{item.name}</h5>
                    <p>Precio: ${item.price.toLocaleString()}</p>
                  </Col>

                  <Col md={3} className='d-flex align-items-center'>
                    <Button
                      variant='secondary'
                      className='me-2'
                      onClick={() => removeFromCart(item.id_product)} // Disminuye la cantidad
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Form.Control
                      type='text'
                      value={item.quantity}
                      readOnly
                      style={{ width: '50px', textAlign: 'center' }}
                    />
                    <Button
                      variant='primary'
                      className='ms-2'
                      onClick={() => addToCart(item)} // Aumenta la cantidad
                    >
                      +
                    </Button>
                  </Col>

                  <Col md={3}>
                    <Button
                      variant='danger'
                      onClick={() => deleteFromCart(item.id_product)} // Eliminar el producto
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className='mt-4'>
            <h4>Total: ${totalPrice.toLocaleString()}</h4>
            <div className='d-flex justify-content-between'>
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
            </div>
          </div>
        </>
      )}
    </Container>
  )
}

export default ShoppingCart
