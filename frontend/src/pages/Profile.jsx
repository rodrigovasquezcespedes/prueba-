import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { Container, Form, Button, Nav, Alert, Card } from 'react-bootstrap'
import Swal from 'sweetalert2'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [role, setRole] = useState(user?.role ? 'Administrador' : 'Usuario')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [activeTab, setActiveTab] = useState('profile')
  const [favorites, setFavorites] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (activeTab === 'favorites') {
      fetchFavorites()
    }
  }, [activeTab])

  // Función para obtener los favoritos y luego obtener los productos
  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/favorites/${user.id_user}`, {
        withCredentials: true
      })
      if (response.data && response.data.length > 0) {
        const favoriteProductIds = response.data.map(fav => fav.id_product)
        fetchFavoriteProducts(favoriteProductIds)
      } else {
        setFavorites([])
      }
    } catch (error) {
      console.error('Error al obtener favoritos:', error)
    }
  }

  // Función para obtener los productos favoritos
  const fetchFavoriteProducts = async (productIds) => {
    try {
      const products = await Promise.all(
        productIds.map(async (productId) => {
          const productResponse = await axios.get(`${urlBaseServer}/api/products/${productId}`, {
            withCredentials: true
          })
          return productResponse.data
        })
      )
      setFavorites(products)
    } catch (error) {
      console.error('Error al obtener los productos favoritos:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.')
      return
    }

    try {
      const response = await axios.put(
        `${urlBaseServer}/api/users/profile`,
        { name, email, password },
        { withCredentials: true }
      )
      Swal.fire('Perfil actualizado', response.data.message, 'success')
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al actualizar el perfil', 'error')
    }
  }

  const renderProfileForm = () => (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rol</Form.Label>
        <Form.Control
          type='text'
          value={role}
          readOnly // No editable
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Nueva Contraseña (Opcional)</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirmar Contraseña</Form.Label>
        <Form.Control
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      {errorMessage && (
        <Alert variant='danger' className='mt-3'>
          {errorMessage}
        </Alert>
      )}
      <Button className='mt-3' type='submit' variant='primary'>
        Actualizar Perfil
      </Button>
    </Form>
  )

  // Función para renderizar los favoritos
  const renderFavorites = () => (
    <div>
      <h3>Favoritos</h3>
      {favorites.length > 0 ? (
        <div className="d-flex flex-wrap">
          {favorites.map((product) => (
            <Card
              key={product.id_product}
              className="m-3"
              style={{ width: '18rem' }}
            >
              <Card.Img
                variant="top"
                src={product.image_url || 'https://via.placeholder.com/150'}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Precio: ${product.price.toLocaleString()}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No tienes productos en favoritos.</p>
      )}
    </div>
  )

  return (
    <Container className='my-5'>
      <h2>Perfil de Usuario</h2>
      <Nav variant='tabs' defaultActiveKey='profile'>
        <Nav.Item>
          <Nav.Link
            eventKey='profile'
            onClick={() => setActiveTab('profile')}
          >
            Editar Perfil
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey='favorites'
            onClick={() => setActiveTab('favorites')}
          >
            Favoritos
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className='mt-4'>
        {activeTab === 'profile' && renderProfileForm()}
        {activeTab === 'favorites' && renderFavorites()}
      </div>
    </Container>
  )
}

export default Profile
