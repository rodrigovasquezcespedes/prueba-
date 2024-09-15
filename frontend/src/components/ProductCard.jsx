import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaEye, FaCartPlus } from 'react-icons/fa'

const ProductCard = ({ producto }) => {
  const { addToCart } = useCart()

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
          alignItems: 'center'
        }}
      >
        <Card.Img
          variant='top'
          src={producto.image_url || 'https://via.placeholder.com/200'}
          alt={producto.name}
          onError={e => (e.target.src = 'https://via.placeholder.com/200')}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
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
