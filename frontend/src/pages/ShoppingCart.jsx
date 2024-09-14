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
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart()

  // Calculate total price of all items in the cart
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
                  {/* Product Image */}
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
                      }} // Smaller image size
                    />
                  </Col>
                  {/* Product Details */}
                  <Col md={4}>
                    <h5>{item.name}</h5>
                    <p>Precio: ${item.price.toLocaleString()}</p>
                  </Col>
                  {/* Quantity Controls */}
                  <Col md={3} className='d-flex align-items-center'>
                    <Button
                      variant='secondary'
                      className='me-2'
                      onClick={() => removeFromCart(item.id_product)}
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
                      onClick={() => addToCart(item)}
                    >
                      +
                    </Button>
                  </Col>
                  {/* Remove Button */}
                  <Col md={3}>
                    <Button
                      variant='danger'
                      onClick={() => removeFromCart(item.id_product)}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Display the total price and "Pagar" button */}
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
