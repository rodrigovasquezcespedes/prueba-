import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { TecnoContext } from '../context/TecnoContext'
import { AuthContext } from '../context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { FaUser, FaShoppingCart, FaStore, FaHeart, FaHome } from 'react-icons/fa'
import logo from '../assets/logo.png'

const Navigation = () => {
  const { carrito, formatPrice } = useContext(TecnoContext)
  const { isAuthenticated, logout } = useContext(AuthContext)

  // Calcular el total del precio del carrito
  const total = carrito.reduce((accum, item) => accum + item.price * item.count, 0)
  const formattedTotal = formatPrice(total)

  // Calcular la cantidad total de productos en el carrito
  const cantidadTotalProductos = carrito.reduce((accum, item) => accum + item.count, 0)

  const handleMenu = ({ isActive }) =>
    isActive ? 'nav-item nav-link active' : 'nav-item nav-link'

  const [navbarClass, setNavbarClass] = useState('navbar-custom')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarClass('navbar-custom shrink')
      } else {
        setNavbarClass('navbar-custom')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Navbar
        expand='lg'
        bg='dark'
        data-bs-theme='dark'
        className={`${navbarClass} sticky-top`}
      >
        <Container>
          <NavLink className={handleMenu} to='/'>
            <Navbar.Brand>
              <img
                src={logo}
                alt='Logo'
                width='60'
                height='60'
                className='d-inline-block align-top'
              />
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <NavLink className={handleMenu} to='/'>
                <FaHome />
              </NavLink>
              {isAuthenticated && (
                <>
                  <NavLink className={handleMenu} to='/productos'>
                    <FaStore />
                  </NavLink>
                  <NavLink className={handleMenu} to='/profile'>
                    <FaUser />
                  </NavLink>
                  <NavLink className={handleMenu} to='/favoritos'>
                    <FaHeart />
                  </NavLink>
                  <NavLink className={handleMenu} to='/carrito'>
                    <FaShoppingCart />
                    {/* Mostrar cantidad de productos si el carrito no está vacío */}
                    {cantidadTotalProductos > 0 && (
                      <span className="badge bg-danger ms-2">{cantidadTotalProductos}</span>
                    )}
                  </NavLink>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <NavLink className={handleMenu} to='/login'>
                    Login
                  </NavLink>
                  <NavLink className={handleMenu} to='/register'>
                    Registrarse
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
