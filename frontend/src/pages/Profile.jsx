import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { Container, Nav, Card, Table } from 'react-bootstrap'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('profile')
  const [favorites, setFavorites] = useState([])
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    if (activeTab === 'favorites') {
      fetchFavorites()
    } else if (activeTab === 'profile') {
      fetchPurchases()
    }
  }, [activeTab])

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `${urlBaseServer}/api/favorites/${user.id_user}`,
        { withCredentials: true }
      )
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

  const fetchFavoriteProducts = async productIds => {
    try {
      const products = await Promise.all(
        productIds.map(async productId => {
          const productResponse = await axios.get(
            `${urlBaseServer}/api/products/${productId}`,
            { withCredentials: true }
          )
          return productResponse.data
        })
      )
      setFavorites(products)
    } catch (error) {
      console.error('Error al obtener los productos favoritos:', error)
    }
  }

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(
        `${urlBaseServer}/api/orders/user/${user.id_user}`,
        { withCredentials: true }
      )
      setPurchases(response.data.length > 0 ? response.data : [])
    } catch (error) {
      console.error('Error al obtener las compras:', error)
    }
  }

  // Renderizar las compras del usuario
  const renderPurchases = () => (
    <div>
      <h3>Mis Compras</h3>
      {purchases.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
              <th>Fecha de compra</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={purchase.id_order}>
                <td>{index + 1}</td>
                <td>{purchase.product_name}</td>
                <td>{purchase.quantity}</td>
                <td>${purchase.price.toLocaleString()}</td>
                <td>
                  ${(purchase.price * purchase.quantity).toLocaleString()}
                </td>
                <td>{new Date(purchase.order_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {purchases.length === 0 && <p>No tienes compras registradas.</p>}
    </div>
  )

  const renderFavorites = () => (
    <div>
      <h3>Favoritos</h3>
      {favorites.length > 0 && (
        <div className='d-flex flex-wrap'>
          {favorites.map(product => (
            <Card
              key={product.id_product}
              className='m-3'
              style={{ width: '18rem' }}
            >
              <Card.Img
                variant='top'
                src={product.image_url || 'https://via.placeholder.com/150'}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Precio: ${product.price.toLocaleString()}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      {favorites.length === 0 && <p>No tienes productos en favoritos.</p>}
    </div>
  )

  return (
    <Container className='my-5'>
      <h2>Perfil de Usuario</h2>
      <Nav variant='tabs' defaultActiveKey='profile'>
        <Nav.Item>
          <Nav.Link eventKey='profile' onClick={() => setActiveTab('profile')}>
            Compras
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
        {activeTab === 'profile' && renderPurchases()}
        {activeTab === 'favorites' && renderFavorites()}
      </div>
    </Container>
  )
}

export default Profile
