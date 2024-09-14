import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import {
  FaShoppingCart,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaBoxOpen,
  FaTachometerAlt,
  FaSignOutAlt
} from 'react-icons/fa'

const Navigation = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  const { cartItems } = useCart() // Get cart items to show the quantity

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/products'>
              <FaBoxOpen className='me-2' />
              Productos
            </Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            <Nav.Link as={Link} to='/shoppingcart'>
              <FaShoppingCart className='me-2' />
              Carrito ({totalItems})
            </Nav.Link>

            {isAuthenticated && user && (
              <>
                <Nav.Item className='text-light me-3'>
                  Bienvenido: {user.name}
                </Nav.Item>
                <Nav.Link as={Link} to='/profile'>
                  <FaUser className='me-2' />
                  Perfil
                </Nav.Link>
              </>
            )}

            {isAuthenticated && user?.role === true && (
              <Nav.Link as={Link} to='/dashboard'>
                <FaTachometerAlt className='me-2' />
                Dashboard
              </Nav.Link>
            )}

            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to='/login'>
                  <FaSignInAlt className='me-2' />
                  Iniciar sesión
                </Nav.Link>
                <Nav.Link as={Link} to='/register'>
                  <FaUserPlus className='me-2' />
                  Registrarse
                </Nav.Link>
              </>
            )}

            {isAuthenticated && (
              <Nav.Link onClick={logout}>
                <FaSignOutAlt className='me-2' />
                Cerrar sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
