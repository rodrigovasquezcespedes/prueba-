import { useEffect, useState } from 'react'
import { Container, Row, Col, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { urlBaseServer } from '../config'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState('')
  const [marcas, setMarcas] = useState('')
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  // Obtener los productos desde la API
  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/products`)
      setProductos(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  // Obtener categorías únicas
  const categoriasUnicas = [
    ...new Set(productos.map(producto => producto.category_name))
  ]

  // Obtener marcas filtradas según la categoría seleccionada
  const marcasFiltradas =
    categorias === ''
      ? [...new Set(productos.map(producto => producto.brand))]
      : [
          ...new Set(
            productos
              .filter(producto => producto.category_name === categorias)
              .map(producto => producto.brand)
          )
        ]

  // Filtrar productos por categoría y marca seleccionadas
  const productosFiltrados = productos.filter(
    producto =>
      (categorias === '' || producto.category_name === categorias) &&
      (marcas === '' || producto.brand === marcas)
  )

  // Ordenar productos
  const productosOrdenados = productosFiltrados.slice().sort((a, b) => {
    if (ordenSeleccionado === 'price-asc') return a.price - b.price
    if (ordenSeleccionado === 'price-desc') return b.price - a.price
    if (ordenSeleccionado === 'name-asc') return a.name.localeCompare(b.name)
    if (ordenSeleccionado === 'name-desc') return b.name.localeCompare(a.name)
    return 0
  })

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = productosOrdenados.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  const totalPages = Math.ceil(productosOrdenados.length / productsPerPage)

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
    // Mover la página al principio del contenedor de productos
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Container className='py-5'>
      {/* Filtros */}
      <Row className='mb-4'>
        <Col md={3}>
          <select
            className='form-select'
            value={categorias}
            onChange={e => setCategorias(e.target.value)}
          >
            <option value=''>Todas las categorías</option>
            {categoriasUnicas.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </Col>

        <Col md={3}>
          <select
            className='form-select'
            value={marcas}
            onChange={e => setMarcas(e.target.value)}
          >
            <option value=''>Todas las marcas</option>
            {marcasFiltradas.map((marca, index) => (
              <option key={index} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </Col>

        <Col md={3}>
          <select
            className='form-select'
            value={ordenSeleccionado}
            onChange={e => setOrdenSeleccionado(e.target.value)}
          >
            <option value='default'>Ordenar por</option>
            <option value='price-asc'>Precio de menor a mayor</option>
            <option value='price-desc'>Precio de mayor a menor</option>
            <option value='name-asc'>Nombre A-Z</option>
            <option value='name-desc'>Nombre Z-A</option>
          </select>
        </Col>
      </Row>

      {/* Mostrar productos */}
      <Row className='g-4'>
        {currentProducts.map(producto => (
          <Col key={producto.id_product} xs={12} sm={6} md={4} lg={3}>
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>

      {/* Paginación */}
      <Row className='d-flex justify-content-center'>
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Row>
    </Container>
  )
}

export default Products
