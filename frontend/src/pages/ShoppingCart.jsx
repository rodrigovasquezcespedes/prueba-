import React from 'react'
import { useCart } from '../context/CartContext'
import {
  Button,
  Container,
  ListGroup,
  Row,
  Col,
  Image,
  Form
} from 'react-bootstrap'

const ShoppingCart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, deleteFromCart } =
    useCart()

  // Calcular el precio total de todos los productos en el carrito
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <Container className='my-5'>
      <h2>Tu Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
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
              <Button variant='success'>Pagar</Button>
            </div>
          </div>
        </>
      )}
    </Container>
  )
}

export default ShoppingCart
