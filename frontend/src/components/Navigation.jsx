import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
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
  const { isAuthenticated, user, logout } = useContext(AuthContext) // Obtener estado de autenticación y usuario del AuthContext
  const { cartItems } = useCart() // Obtener productos del carrito

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0) // Calcular total de productos en el carrito

  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='sticky-top py-1'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='fw-bold'>
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
          <Nav className='ms-auto align-items-center'>
            {/* Carrito de compras */}
            <Nav.Link
              as={Link}
              to='/shoppingcart'
              className='d-flex align-items-center'
            >
              <FaShoppingCart className='me-2' />
              Carrito
              {totalItems > 0 && (
                <Badge pill bg='success' className='ms-2'>
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>

            {/* Mostrar contenido solo si está autenticado */}
            {isAuthenticated && user && (
              <>
                <Nav.Item className='text-light me-3'>
                  Bienvenido, {user.name}!
                </Nav.Item>
                <Nav.Link as={Link} to='/profile'>
                  <FaUser className='me-2' />
                  Perfil
                </Nav.Link>
                {user.role === true && (
                  <Nav.Link as={Link} to='/dashboard'>
                    <FaTachometerAlt className='me-2' />
                    Dashboard
                  </Nav.Link>
                )}
                <Nav.Link onClick={logout}>
                  <FaSignOutAlt className='me-2' />
                  Cerrar sesión
                </Nav.Link>
              </>
            )}

            {/* Mostrar opciones de login y registro si NO está autenticado */}
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
