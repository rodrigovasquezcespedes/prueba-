import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='container d-flex flex-column justify-content-center align-items-center vh-100'>
      <h1 className='display-1 text-danger'>404</h1>
      <h2 className='mb-4'>Página no encontrada</h2>
      <p className='text-muted mb-4'>
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link to='/products'>
        <button className='btn btn-primary btn-lg'>Volver a Productos</button>
      </Link>
    </div>
  )
}

export default NotFound
