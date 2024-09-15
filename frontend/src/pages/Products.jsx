import { useEffect, useState } from 'react'
import { Container, Row, Col, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { urlBaseServer } from '../config'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('') // Ahora seleccionamos por id_category
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('')
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('recientes')
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

  // Obtener las categorías desde la API
  const fetchCategorias = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/categories`)
      setCategorias(response.data) // Guardar las categorías en el estado
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    // Cargar productos y categorías al iniciar
    fetchProductos()
    fetchCategorias()
  }, [])

  // Obtener marcas filtradas según la categoría seleccionada
  const marcasFiltradas =
    categoriaSeleccionada === ''
      ? [...new Set(productos.map(producto => producto.brand))]
      : [
          ...new Set(
            productos
              .filter(
                producto =>
                  producto.id_category === Number(categoriaSeleccionada)
              ) // Filtrar por id_category
              .map(producto => producto.brand)
          )
        ]

  // Filtrar productos por categoría (id_category) y marca seleccionadas
  const productosFiltrados = productos.filter(producto => {
    const coincideCategoria =
      categoriaSeleccionada === '' ||
      producto.id_category === Number(categoriaSeleccionada) // Comparar id_category
    const coincideMarca =
      marcaSeleccionada === '' || producto.brand === marcaSeleccionada

    return coincideCategoria && coincideMarca
  })

  // Mostrar en consola las categorías y productos para depurar
  useEffect(() => {
    console.log('Productos:', productos)
    console.log('Categorías:', categorias)
    console.log('Categoría seleccionada (ID):', categoriaSeleccionada)
  }, [productos, categorias, categoriaSeleccionada])

  // Ordenar productos, agregando opción para ordenar por recientes
  const productosOrdenados = productosFiltrados.slice().sort((a, b) => {
    if (ordenSeleccionado === 'price-asc') return a.price - b.price
    if (ordenSeleccionado === 'price-desc') return b.price - a.price
    if (ordenSeleccionado === 'name-asc') return a.name.localeCompare(b.name)
    if (ordenSeleccionado === 'name-desc') return b.name.localeCompare(a.name)
    if (ordenSeleccionado === 'recientes') return new Date(b.created_at) - new Date(a.created_at)
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Container className='py-5'>
      {/* Filtros */}
      {/* Filtros centrados */}
      <Row className='mb-4 d-flex justify-content-center'>
        <Col xs={12} sm={6} md={4} lg={3} className='mb-2'>
          <select
            className='form-select w-100' // Asegura que el select ocupe el 100% del ancho
            value={categoriaSeleccionada}
            onChange={e => setCategoriaSeleccionada(e.target.value)}
          >
            <option value=''>Todas las categorías</option>
            {categorias.map(categoria => (
              <option key={categoria.id_category} value={categoria.id_category}>
                {categoria.category_name}
              </option>
            ))}
          </select>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3} className='mb-2'>
          <select
            className='form-select w-100' // Asegura que el select ocupe el 100% del ancho
            value={marcaSeleccionada}
            onChange={e => setMarcaSeleccionada(e.target.value)}
          >
            <option value=''>Todas las marcas</option>
            {marcasFiltradas.map((marca, index) => (
              <option key={index} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3} className='mb-2'>
          <select
            className='form-select w-100' // Asegura que el select ocupe el 100% del ancho
            value={ordenSeleccionado}
            onChange={e => setOrdenSeleccionado(e.target.value)}
          >
            <option value='recientes'>Recientes</option>
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
      <Row className='d-flex justify-content-center mt-4'>
        <Col xs='auto'>
          {' '}
          {/* Asegura que la paginación ocupe solo el espacio necesario */}
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
        </Col>
      </Row>
    </Container>
  )
}

export default Products
