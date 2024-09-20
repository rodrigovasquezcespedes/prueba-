import React, { useContext } from 'react'
import { useCart } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext' // Asegúrate de importar el AuthContext
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Importar useNavigate para redireccionar
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
  const { user } = useContext(AuthContext) // Obtener el usuario logueado
  const navigate = useNavigate() // Definir el hook useNavigate para redireccionar

  // Calcular el precio total de todos los productos en el carrito sin usar reduce
  let totalPrice = 0
  cartItems.forEach(item => {
    totalPrice += item.price * item.quantity
  })

  // Función para manejar el pago
  const handlePayment = async () => {
    try {
      const paymentMethod = 'credit_card'

      // Enviar los detalles del carrito al backend para procesar el pago
      const response = await axios.post(
        `${urlBaseServer}/api/orders/pay`,
        {
          id_user: user.id_user, // Aquí se envía el ID del usuario logueado
          items: cartItems, // Los productos en el carrito
          payment_method: paymentMethod // Método de pago
        }
      )

      if (response.status === 201) {
        Swal.fire({
          title: 'Pago Exitoso',
          text: 'Tu pago ha sido procesado con éxito.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          clearCart() // Vaciar el carrito si el pago fue exitoso
          navigate('/products') // Redireccionar a la página de productos
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

      {/* Si el carrito está vacío */}
      {cartItems.length === 0 && <p>Tu carrito está vacío</p>}

      {/* Si hay productos en el carrito */}
      {cartItems.length > 0 && (
        <>
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.id_product} className='mb-3'>
                <Row className='align-items-center'>
                  {/* Imagen del producto */}
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

                  {/* Detalles del producto */}
                  <Col md={4}>
                    <h5>{item.name}</h5>
                    <p>Precio: ${item.price.toLocaleString()}</p>
                  </Col>

                  {/* Controles de cantidad */}
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

                  {/* Botón de eliminar */}
                  <Col md={3}>
                    <Button
                      variant='danger'
                      onClick={() => deleteFromCart(item.id_product)} // Elimina el producto completamente
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Mostrar el precio total y el botón "Pagar" */}
          <div className='mt-4'>
            <h4>Total: ${totalPrice.toLocaleString()}</h4>
            <div className='d-flex justify-content-between'>
              <Button variant='warning' onClick={clearCart}>
                Vaciar Carrito
              </Button>
              <Button
                variant='success'
                onClick={handlePayment}
                disabled={cartItems.length === 0} // Desactivar si el carrito está vacío
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
