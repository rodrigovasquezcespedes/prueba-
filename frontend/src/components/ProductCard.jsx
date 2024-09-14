import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaEye, FaCartPlus } from 'react-icons/fa' // Import icons for "view" and "add to cart"

const ProductCard = ({ producto }) => {
  const { addToCart } = useCart()

  return (
    <Card style={{ width: '100%', minHeight: '25rem' }} className='mb-4'>
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
        <Card.Text>
          Precio: ${producto.price.toLocaleString()}
          <br />
          {producto.description}
        </Card.Text>
        <div className='d-flex w-100 mt-2'>
          {/* Full-width buttons with equal space */}
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
