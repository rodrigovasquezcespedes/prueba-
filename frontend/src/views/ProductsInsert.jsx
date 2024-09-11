import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Button, Form } from 'react-bootstrap'

const ProductsInsert = () => {
  const [nombre, setNombre] = useState('')
  const [img, setImg] = useState('')
  const [desc, setDesc] = useState('')
  const [precio, setPrecio] = useState('')
  const [marca, setMarca] = useState('')
  const [categoria, setCategoria] = useState('') // Mantiene el ID de la categoría seleccionada
  const [stock, setStock] = useState(100) // Valor por defecto
  const [especificaciones, setEspecificaciones] = useState([
    { nombre: '', valor: '' }
  ])
  const [categorias, setCategorias] = useState([]) // Arreglo para almacenar las categorías desde la API

  const urlBaseServer = 'http://localhost:3000'

  // Obtener categorías desde la base de datos
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(`${urlBaseServer}/api/categories`)
        setCategorias(response.data) // Guardamos las categorías en el estado
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategorias() // Llamamos a la función para cargar las categorías
  }, [])

  const handleAddSpecification = () => {
    setEspecificaciones([...especificaciones, { nombre: '', valor: '' }])
  }

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = especificaciones.map((especificacion, i) =>
      i === index ? { ...especificacion, [field]: value } : especificacion
    )
    setEspecificaciones(updatedSpecs)
  }

  const agregarProducto = async () => {
    try {
      const producto = {
        name: nombre,
        imageUrl: img,
        description: desc,
        price: parseInt(precio, 10),
        stock: parseInt(stock, 10), // stock asignado
        brand: marca,
        categoryId: parseInt(categoria, 10), // Enviar el ID de la categoría seleccionada
        specifications: especificaciones.map(({ nombre, valor }) => ({
          [nombre]: valor
        }))
      }
      await axios.post(`${urlBaseServer}/api/products`, producto)
      // Vaciar formulario después de agregar
      setNombre('')
      setImg('')
      setDesc('')
      setPrecio('')
      setMarca('')
      setCategoria('')
      setStock(100) // Reestablecer stock
      setEspecificaciones([{ nombre: '', valor: '' }])
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  return (
    <Container className='my-5'>
      <Row className='justify-content-center'>
        <h2 className='text-center mb-4'>Agregar Producto</h2>
        <Form className='col-md-6'>
          <Form.Group className='mb-3'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Imagen URL</Form.Label>
            <Form.Control
              type='text'
              value={img}
              onChange={e => setImg(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type='text'
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type='number'
              value={precio}
              onChange={e => setPrecio(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type='number'
              value={stock}
              onChange={e => setStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type='text'
              value={marca}
              onChange={e => setMarca(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              <option value=''>Seleccionar categoría</option>
              {categorias.map(cat => (
                <option key={cat.id_category} value={cat.id_category}>
                  {cat.category_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <h5>Especificaciones</h5>
          {especificaciones.map((especificacion, index) => (
            <div key={index} className='mb-3'>
              <Form.Group className='mb-2'>
                <Form.Label>Nombre de Especificación</Form.Label>
                <Form.Control
                  type='text'
                  value={especificacion.nombre}
                  onChange={e =>
                    handleSpecificationChange(index, 'nombre', e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type='text'
                  value={especificacion.valor}
                  onChange={e =>
                    handleSpecificationChange(index, 'valor', e.target.value)
                  }
                />
              </Form.Group>
            </div>
          ))}
          <Button
            variant='primary'
            onClick={handleAddSpecification}
            className='me-2'
          >
            Agregar Especificación
          </Button>
          <Button variant='success' onClick={agregarProducto}>
            Agregar Producto
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default ProductsInsert
