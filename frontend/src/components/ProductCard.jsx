import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { FaEye, FaCartPlus, FaHeart } from 'react-icons/fa'
import axios from 'axios'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const ProductCard = ({ producto, userId }) => {
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites } = useFavorites()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Comprobar si el producto ya está en favoritos al cargar la página
    const fetchFavoriteStatus = async () => {
      try {
        const response = await axios.get(
          `${urlBaseServer}/api/favorites/${userId}`
        )
        const favoriteProducts = response.data.map(fav => fav.id_product)
        setIsFavorite(favoriteProducts.includes(producto.id_product))
      } catch (error) {
        console.error('Error al comprobar el estado de los favoritos:', error)
      }
    }

    if (userId) {
      fetchFavoriteStatus()
    }
  }, [userId, producto.id_product])

  // Función para manejar el click en el corazón
  const toggleFavorite = async () => {
    if (isFavorite) {
      try {
        await axios.delete(`${urlBaseServer}/api/favorites`, {
          data: { id_user: userId, id_product: producto.id_product }
        })
        removeFromFavorites(producto.id_product)
        setIsFavorite(false)
      } catch (error) {
        console.error('Error al eliminar de favoritos:', error)
      }
    } else {
      try {
        await axios.post(`${urlBaseServer}/api/favorites`, {
          id_user: userId,
          id_product: producto.id_product
        })
        addToFavorites(producto)
        setIsFavorite(true)
      } catch (error) {
        console.error('Error al agregar a favoritos:', error)
      }
    }
  }

  return (
    <Card
      className='h-100 d-flex flex-column justify-content-between mb-4'
      style={{ minHeight: '25rem' }}
    >
      <div
        style={{
          height: '200px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Card.Img
          variant='top'
          src={producto.image_url || 'https://via.placeholder.com/200'}
          alt={producto.name}
          onError={e => (e.target.src = 'https://via.placeholder.com/200')}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
        {/* Botón de favoritos pegado a la parte superior derecha */}
        <Button
          variant='light'
          className='position-absolute top-0 end-0 m-2 p-0'
          onClick={toggleFavorite}
          style={{
            backgroundColor: 'transparent',
            borderRadius: '50%',
            border: '2px solid rgba(0, 0, 0, 0.2)',
            width: '40px',
            height: '40px',
            color: isFavorite ? 'red' : 'rgba(0, 0, 0, 0.5)',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FaHeart size={20} />
        </Button>
      </div>
      <Card.Body className='d-flex flex-column justify-content-between'>
        <Card.Title>{producto.name}</Card.Title>
        <Card.Text className='fs-5'>
          Precio: ${producto.price.toLocaleString()}
        </Card.Text>
        <Card.Text>{producto.description}</Card.Text>
        <div className='mt-auto d-flex w-100'>
          <Button
            as={Link}
            to={`/detail/${producto.id_product}`}
            variant='info'
            className='w-50'
            style={{ padding: '0.5rem' }}
          >
            <FaEye size={18} />
          </Button>
          <Button
            variant='primary'
            onClick={() => addToCart(producto)}
            className='w-50 ms-2'
            style={{ padding: '0.5rem' }}
          >
            <FaCartPlus size={18} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
