import React, { useState, useEffect } from 'react'
import { Table, Button, Form, Modal, Row, Col, Pagination } from 'react-bootstrap'
import axios from 'axios'

const ProductCrud = () => {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    specifications: []
  })
  const [newSpecification, setNewSpecification] = useState({
    spec_name: '',
    spec_value: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 5 // Número de productos por página

  const apiUrl = 'http://localhost:3000/api/products' // Cambia por tu URL de la API

  // Obtener los productos desde la API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiUrl)
      setProducts(response.data) // Asumimos que la respuesta contiene un array de productos
    } catch (error) {
      console.error('Error al obtener los productos:', error)
    }
  }

  useEffect(() => {
    fetchProducts() // Cargar productos cuando el componente se monta
  }, [])

  // Agregar una especificación temporalmente
  const addSpecification = () => {
    setNewProduct(prevState => ({
      ...prevState,
      specifications: [...prevState.specifications, newSpecification]
    }))
    setNewSpecification({ spec_name: '', spec_value: '' }) // Resetear la especificación
  }

  // Eliminar una especificación
  const deleteSpecification = index => {
    setNewProduct(prevState => ({
      ...prevState,
      specifications: prevState.specifications.filter((_, i) => i !== index)
    }))
  }

  // Agregar un nuevo producto con especificaciones mediante la API
  const addProduct = async () => {
    try {
      const response = await axios.post(apiUrl, newProduct)
      setProducts([...products, response.data]) // Añadir el producto recién creado al listado
      setShowModal(false)
      setNewProduct({
        name: '',
        price: '',
        description: '',
        stock: '',
        specifications: []
      })
    } catch (error) {
      console.error('Error al agregar el producto:', error)
    }
  }

  // Eliminar un producto de la API
  const deleteProduct = async id => {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      setProducts(products.filter(product => product.id !== id)) // Eliminar el producto del estado local
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
    }
  }

  // Calcular los productos actuales en la página
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <h3>Gestión de Productos</h3>
      <Button variant='primary' onClick={() => setShowModal(true)}>
        Añadir Producto
      </Button>

      {/* Tabla de productos paginada */}
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Button variant='danger' onClick={() => deleteProduct(product.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Paginación */}
      <Pagination className='justify-content-center'>
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

      {/* Modal para añadir producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formName'>
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa el nombre'
                value={newProduct.name}
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formDescription' className='mt-3'>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa la descripción'
                value={newProduct.description}
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formPrice' className='mt-3'>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type='number'
                placeholder='Ingresa el precio'
                value={newProduct.price}
                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formStock' className='mt-3'>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Ingresa el stock'
                value={newProduct.stock}
                onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </Form.Group>

            <hr />
            <h5>Especificaciones del Producto</h5>

            {/* Campos para añadir especificaciones */}
            <Row>
              <Col>
                <Form.Group controlId='formSpecName'>
                  <Form.Label>Nombre de la Especificación</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ej. Color'
                    value={newSpecification.spec_name}
                    onChange={e => setNewSpecification({ ...newSpecification, spec_name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='formSpecValue'>
                  <Form.Label>Valor de la Especificación</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ej. Rojo'
                    value={newSpecification.spec_value}
                    onChange={e => setNewSpecification({ ...newSpecification, spec_value: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col className='d-flex align-items-end'>
                <Button variant='success' onClick={addSpecification}>
                  Añadir Especificación
                </Button>
              </Col>
            </Row>

            {/* Listado de especificaciones añadidas */}
            <ul className='mt-3'>
              {newProduct.specifications.map((spec, index) => (
                <li key={index}>
                  {spec.spec_name}: {spec.spec_value}
                  <Button
                    variant='danger'
                    size='sm'
                    className='ms-2'
                    onClick={() => deleteSpecification(index)}
                  >
                    Eliminar
                  </Button>
                </li>
              ))}
            </ul>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={addProduct}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProductCrud
