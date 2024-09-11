import { Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import { urlBaseServer } from '../config'

const Products = () => {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState('')
  const [marcas, setMarcas] = useState('')
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('')

  // Obtener los productos desde la API
  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/products`)
      console.log('Productos recibidos:', response.data) // Verificar los datos recibidos
      setProductos(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    fetchProductos() // Llamar a la API cuando el componente se monte
  }, [])

  // Obtener categorías únicas
  const categoriasUnicas = [
    ...new Set(productos.map(producto => producto.category_name))
  ]
  console.log('Categorías únicas:', categoriasUnicas) // Verificar si las categorías están cargando correctamente

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

  return (
    <Container className='py-5'>
      <Row>
        <div className='d-flex gap-5 my-5'>
          {/* Selección de Categorías */}
          <select
            className='form-select mb-4'
            value={categorias}
            onChange={e => {
              setCategorias(e.target.value)
              setMarcas('') // Reiniciar marcas al cambiar de categoría
            }}
          >
            <option value=''>Todas las Categorías</option>
            {categoriasUnicas.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>

          {/* Selección de Marcas */}
          <select
            className='form-select mb-4'
            value={marcas}
            onChange={e => setMarcas(e.target.value)}
          >
            <option value=''>Todas las Marcas</option>
            {marcasFiltradas.map((marca, index) => (
              <option key={index} value={marca}>
                {marca}
              </option>
            ))}
          </select>

          {/* Ordenar productos */}
          <select
            className='form-select mb-4'
            value={ordenSeleccionado}
            onChange={e => setOrdenSeleccionado(e.target.value)}
          >
            <option value='default'>Ordenar por</option>
            <option value='price-asc'>Precio de menor a mayor</option>
            <option value='price-desc'>Precio de mayor a menor</option>
            <option value='name-asc'>Nombre: A-Z</option>
            <option value='name-desc'>Nombre: Z-A</option>
          </select>
        </div>
      </Row>

      {/* Mostrar productos */}
      <Row>
        {productosOrdenados.map(producto => (
          <ProductCard key={producto.id_product} producto={producto} />
        ))}
      </Row>
    </Container>
  )
}

export default Products
