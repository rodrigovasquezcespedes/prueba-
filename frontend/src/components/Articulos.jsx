import { useContext } from 'react'
import { TecnoContext } from '../context/TecnoContext'
import { Container, Row } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'

const Articulos = ({ articulo, eliminarArticulo }) => {
  const { addAndRemoveFavorite } = useContext(TecnoContext)

  return (
    <Container>
      <Row>
        <ProductCard
          id={articulo.id}
          titulo={articulo.titulo}
          img={articulo.img}
          descripcion={articulo.descripcion}
          marca={articulo.marca}
          precio={articulo.precio}
          addAndRemoveFavorite={addAndRemoveFavorite}
          eliminarArticulo={eliminarArticulo}
        />
      </Row>
    </Container>
  )
}

export default Articulos
