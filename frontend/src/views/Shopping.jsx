import { Container, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { TecnoContext } from '../context/TecnoContext'
import { useContext } from 'react'

const Shopping = () => {
  const navigate = useNavigate()
  const { carrito, incrementar, decrementar, formatPrice, vaciarCarrito, eliminarProducto } = useContext(TecnoContext)
  const MySwal = withReactContent(Swal)

  // Calcular el total del carrito
  const total = carrito.reduce((acc, item) => acc + item.price * item.count, 0)

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      MySwal.fire({
        title: 'Carrito vacío',
        text: 'No tienes productos en tu carrito.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return
    }

    MySwal.fire({
      title: '¿Confirmar compra?',
      text: `El total de tu compra es ${formatPrice(total)}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: 'Compra realizada',
          text: 'Tu orden está siendo procesada.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          vaciarCarrito()
          navigate('/productos')
        })
      }
    })
  }

  return (
    <Container className='my-5'>
      <Row className='shadow bg-light rounded p-3'>
        <h2 className='mt-5'>Detalle del Pedido</h2>

        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          carrito.map((product, index) => (
            <div key={product.id} className='d-flex flex-column flex-md-row align-items-center my-3'>
              <div className='col-md-6 d-flex align-items-center gap-4'>
                {/* Verificar que la URL de la imagen esté correcta */}
                <img src={product.imageUrl} width={200} alt={product.name} onError={e => (e.target.src = 'https://via.placeholder.com/200')} />
                <p className='mb-0'>{product.name}</p>
              </div>
              <div className='col-md-6 d-flex align-items-center justify-content-center gap-3 mt-3 mt-md-0'>
                <Button onClick={() => decrementar(index)} variant='dark'>
                  -
                </Button>
                <p className='mb-0'>{product.count}</p>
                <Button onClick={() => incrementar(index)} variant='dark'>
                  +
                </Button>
                <Button onClick={() => eliminarProducto(index)} variant='outline-dark'>
                  Eliminar
                </Button>
              </div>
            </div>
          ))
        )}

        {carrito.length > 0 && (
          <Row className='my-4 w-100'>
            <h4 className='mb-4'>Total: {formatPrice(total)}</h4>
            <div className='d-flex gap-3'>
              <Button onClick={() => navigate('/productos')} variant='secondary'>
                Seguir comprando
              </Button>
              <Button onClick={finalizarCompra} variant='primary'>
                Finalizar compra
              </Button>
            </div>
          </Row>
        )}
      </Row>
    </Container>
  )
}

export default Shopping
