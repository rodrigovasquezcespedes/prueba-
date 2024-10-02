import { useEffect, useState, useMemo } from 'react'
import { Container, Row, Col, Pagination, Button } from 'react-bootstrap'
import axios from 'axios'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import Cookies from 'js-cookie' // Importa la librería js-cookie para manejar cookies

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const Products = () => {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('')
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('recientes')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12
  const [showScrollButton, setShowScrollButton] = useState(false)

  // Función para recuperar el token desde las cookies
  const getTokenFromCookies = () => {
    return Cookies.get('token')
  }

  // Configurar axios para que siempre envíe el token en el encabezado de autorización
  axios.defaults.headers.common.Authorization = `Bearer ${getTokenFromCookies()}`

  useEffect(() => {
    const fetchProductosYCategorias = async () => {
      try {
        // Las solicitudes enviarán automáticamente el token gracias a la configuración de axios
        const [productosResponse, categoriasResponse] = await Promise.all([
          axios.get(`${urlBaseServer}/api/products`),
          axios.get(`${urlBaseServer}/api/categories`)
        ])
        setProductos(productosResponse.data)
        setCategorias(categoriasResponse.data)
      } catch (error) {
        console.error('Error al obtener productos o categorías:', error)
      }
    }

    fetchProductosYCategorias()
  }, [])

  // Efecto para mostrar el botón de scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const marcasFiltradas = useMemo(() => {
    const marcas = productos
      .filter(
        producto =>
          !categoriaSeleccionada ||
          producto.id_category === Number(categoriaSeleccionada)
      )
      .map(producto => producto.brand)
    return [...new Set(marcas)]
  }, [productos, categoriaSeleccionada])

  const productosFiltradosYOrdenados = useMemo(() => {
    const productosFiltrados = productos.filter(producto => {
      const coincideCategoria =
        !categoriaSeleccionada ||
        producto.id_category === Number(categoriaSeleccionada)
      const coincideMarca =
        !marcaSeleccionada || producto.brand === marcaSeleccionada
      return coincideCategoria && coincideMarca
    })

    return productosFiltrados.slice().sort((a, b) => {
      if (ordenSeleccionado === 'price-asc') return a.price - b.price
      if (ordenSeleccionado === 'price-desc') return b.price - a.price
      if (ordenSeleccionado === 'name-asc') return a.name.localeCompare(b.name)
      if (ordenSeleccionado === 'name-desc') return b.name.localeCompare(a.name)
      if (ordenSeleccionado === 'recientes') return new Date(b.created_at) - new Date(a.created_at)
      return 0
    })
  }, [productos, categoriaSeleccionada, marcaSeleccionada, ordenSeleccionado])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = productosFiltradosYOrdenados.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  const totalPages = Math.ceil(
    productosFiltradosYOrdenados.length / productsPerPage
  )

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })

  return (
    <Container className='py-5'>
      <Row className='mb-4 d-flex justify-content-center'>
        <Col xs={12} sm={6} md={4} lg={3} className='mb-2'>
          <select
            className='form-select w-100'
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
            className='form-select w-100'
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
            className='form-select w-100'
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

      <Row className='g-4'>
        {currentProducts.map(producto => (
          <Col key={producto.id_product} xs={12} sm={6} md={4} lg={3}>
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>

      <Row className='d-flex justify-content-center mt-4'>
        <Col xs='auto'>
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

      {showScrollButton && (
        <>
          <Button
            variant='primary'
            className='position-fixed top-0 end-0 my-5'
            onClick={scrollToBottom}
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FaArrowDown size={20} />
          </Button>
          <Button
            variant='primary'
            className='position-fixed bottom-0 end-0 my-5'
            onClick={scrollToTop}
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FaArrowUp size={20} />
          </Button>
        </>
      )}
    </Container>
  )
}

export default Products
