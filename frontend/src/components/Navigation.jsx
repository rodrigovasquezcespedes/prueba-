import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import Swal from 'sweetalert2'
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
  const navigate = useNavigate()
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = async () => {
    try {
      await logout()

      Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada',
        text: 'Has cerrado sesión correctamente.',
        timer: 2000,
        showConfirmButton: false
      })

      setTimeout(() => {
        navigate('/products')
      }, 2000)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al cerrar sesión. Inténtalo de nuevo.'
      })
    }
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='sticky-top py-1'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='fw-bold'>
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {/* Todos los enlaces alineados a la derecha */}
          <Nav className='ms-auto align-items-center'>
            {isAuthenticated && user && (
              <Nav.Item className='text-light me-3'>
                Bienvenido, {user.name}!
              </Nav.Item>
            )}
            <Nav.Link as={Link} to='/products'>
              <FaBoxOpen className='me-2' />
              Productos
            </Nav.Link>
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

            {isAuthenticated && user && (
              <>
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
                <Nav.Link onClick={handleLogout}>
                  <FaSignOutAlt className='me-2' />
                  Cerrar sesión
                </Nav.Link>
              </>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
