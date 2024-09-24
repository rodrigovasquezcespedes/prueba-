import { useState, useEffect, useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { FaEye, FaCartPlus, FaHeart } from 'react-icons/fa'
import axios from 'axios'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const ProductCard = ({ producto }) => {
  const { user } = useContext(AuthContext)
  const { addToCart } = useCart()
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites() // Acceder a los favoritos del contexto
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteId, setFavoriteId] = useState(null)

  // Cargar el estado del producto en favoritos cuando se carga el componente
  useEffect(() => {
    if (user?.id_user && producto.id_product) {
      fetchFavoriteStatus()
    }
  }, [user?.id_user, producto.id_product])

  // Función para verificar si el producto ya está en favoritos
  const fetchFavoriteStatus = () => {
    if (favorites && favorites.length > 0) {
      const favorite = favorites.find(
        fav => fav.id_product === producto.id_product
      )
      setIsFavorite(!!favorite)
      setFavoriteId(favorite?.id_favorite || null)
    }
  }

  // Función para agregar un producto a favoritos
  const addFavorite = async () => {
    try {
      const response = await axios.post(
        `${urlBaseServer}/api/favorites`,
        {
          idUser: user.id_user,
          idProduct: producto.id_product
        },
        { withCredentials: true }
      )
      addToFavorites(producto) // Actualizar favoritos en el contexto
      setIsFavorite(true) // Cambiar el estado inmediatamente
      setFavoriteId(response.data.id_favorite) // Guardar el ID del favorito desde la respuesta
      console.log('Favorito agregado con éxito')
    } catch (error) {
      console.error(
        'Error al agregar a favoritos:',
        error.response?.data || error.message
      )
    }
  }

  // Función para eliminar un producto de favoritos
  const removeFavorite = async () => {
    try {
      await axios.delete(`${urlBaseServer}/api/favorites/${favoriteId}`, {
        withCredentials: true
      })
      removeFromFavorites(producto.id_product) // Actualizar favoritos en el contexto
      setIsFavorite(false) // Cambiar el estado inmediatamente
      setFavoriteId(null) // Resetear el ID del favorito
      console.log('Favorito eliminado con éxito')
    } catch (error) {
      console.error(
        'Error al eliminar de favoritos:',
        error.response?.data || error.message
      )
    }
  }

  // Función para alternar entre agregar y eliminar de favoritos
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite() // Eliminar de favoritos
    } else {
      addFavorite() // Agregar a favoritos
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
        {/* Solo mostrar el botón de favoritos si el usuario está logueado */}
        {user && (
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
        )}
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
