import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col,
  Pagination
} from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const ProductCrud = () => {
  const [products, setProducts] = useState([])
  const [showAddModal, setShowAddModal] = useState(false) // Modal para añadir producto
  const [showEditModal, setShowEditModal] = useState(false) // Modal para editar producto
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    id_product: '',
    name: '',
    price: '',
    description: '',
    stock: '',
    image_url: '', // Campo para la URL de la imagen
    specifications: []
  })
  const [newSpecification, setNewSpecification] = useState({
    spec_name: '',
    spec_value: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 5

  // Obtener los productos desde la API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/products`)
      setProducts(response.data)
    } catch (error) {
      console.error('Error al obtener los productos:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Agregar una especificación temporalmente
  const addSpecification = () => {
    setNewProduct(prevState => ({
      ...prevState,
      specifications: [...prevState.specifications, newSpecification]
    }))
    setNewSpecification({ spec_name: '', spec_value: '' })
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
      const response = await axios.post(
        `${urlBaseServer}/api/products`,
        newProduct
      )
      setProducts([...products, response.data])
      setShowAddModal(false)
      setNewProduct({
        id_product: '',
        name: '',
        price: '',
        description: '',
        stock: '',
        image_url: '', // Restablecer la URL de la imagen
        specifications: []
      },
      {
        withCredentials: true
      })

      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto se ha agregado correctamente'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al agregar el producto'
      })
    }
  }

  // Eliminar un producto de la API
  const deleteProduct = async idProduct => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${urlBaseServer}/api/products/${idProduct}`,
            {
              withCredentials: true
            })
          setProducts(
            products.filter(product => product.id_product !== idProduct)
          )

          Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success')
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al eliminar el producto'
          })
        }
      }
    })
  }

  // Editar un producto
  const editProduct = product => {
    setNewProduct(product)
    setEditingProduct(product.id_product)
    setShowEditModal(true)
  }

  // Actualizar un producto mediante la API
  const updateProduct = async () => {
    try {
      await axios.put(
        `${urlBaseServer}/api/products/${editingProduct}`,
        newProduct,
        {
          withCredentials: true
        }
      )
      setProducts(
        products.map(product =>
          product.id_product === editingProduct ? newProduct : product
        )
      )
      setShowEditModal(false)
      setEditingProduct(null)
      setNewProduct({
        id_product: '',
        name: '',
        price: '',
        description: '',
        stock: '',
        image_url: '',
        specifications: []
      })

      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado',
        text: 'El producto se ha actualizado correctamente'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar el producto'
      })
    }
  }

  // Calcular los productos actuales en la página
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  const totalPages = Math.ceil(products.length / productsPerPage)

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <h3>Gestión de Productos</h3>
      <Button
        variant='primary'
        onClick={() => {
          setNewProduct({
            id_product: '',
            name: '',
            price: '',
            description: '',
            stock: '',
            image_url: '',
            specifications: []
          })
          setShowAddModal(true)
        }}
      >
        Añadir Producto
      </Button>

      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id_product}>
              <td>{product.id_product}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <img
                  src={product.image_url}
                  alt={product.name}
                  width='50'
                  height='50'
                  onError={e =>
                    (e.target.src = 'https://via.placeholder.com/200')}
                />
              </td>
              <td>
                <div className='d-flex justify-content-around'>
                  <Button
                    variant='danger'
                    className='me-2'
                    onClick={() => deleteProduct(product.id_product)}
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant='warning'
                    onClick={() => editProduct(product)}
                  >
                    Editar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
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
                onChange={e =>
                  setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formDescription' className='mt-3'>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa la descripción'
                value={newProduct.description}
                onChange={e =>
                  setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formPrice' className='mt-3'>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type='number'
                placeholder='Ingresa el precio'
                value={newProduct.price}
                onChange={e =>
                  setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formStock' className='mt-3'>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Ingresa el stock'
                value={newProduct.stock}
                onChange={e =>
                  setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formImageUrl' className='mt-3'>
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa la URL de la imagen'
                value={newProduct.image_url}
                onChange={e =>
                  setNewProduct({ ...newProduct, image_url: e.target.value })}
              />
            </Form.Group>

            <hr />
            <h5>Especificaciones del Producto</h5>

            <Row>
              <Col>
                <Form.Group controlId='formSpecName'>
                  <Form.Label>Nombre de la Especificación</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ej. Color'
                    value={newSpecification.spec_name}
                    onChange={e =>
                      setNewSpecification({
                        ...newSpecification,
                        spec_name: e.target.value
                      })}
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
                    onChange={e =>
                      setNewSpecification({
                        ...newSpecification,
                        spec_value: e.target.value
                      })}
                  />
                </Form.Group>
              </Col>
              <Col className='d-flex align-items-end'>
                <Button variant='success' onClick={addSpecification}>
                  Añadir Especificación
                </Button>
              </Col>
            </Row>

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
          <Button variant='secondary' onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={addProduct}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar producto */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formName'>
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa el nombre'
                value={newProduct.name}
                onChange={e =>
                  setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formDescription' className='mt-3'>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa la descripción'
                value={newProduct.description}
                onChange={e =>
                  setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formPrice' className='mt-3'>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type='number'
                placeholder='Ingresa el precio'
                value={newProduct.price}
                onChange={e =>
                  setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formStock' className='mt-3'>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Ingresa el stock'
                value={newProduct.stock}
                onChange={e =>
                  setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formImageUrl' className='mt-3'>
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa la URL de la imagen'
                value={newProduct.image_url}
                onChange={e =>
                  setNewProduct({ ...newProduct, image_url: e.target.value })}
              />
            </Form.Group>

            <hr />
            <h5>Especificaciones del Producto</h5>

            <Row>
              <Col>
                <Form.Group controlId='formSpecName'>
                  <Form.Label>Nombre de la Especificación</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ej. Color'
                    value={newSpecification.spec_name}
                    onChange={e =>
                      setNewSpecification({
                        ...newSpecification,
                        spec_name: e.target.value
                      })}
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
                    onChange={e =>
                      setNewSpecification({
                        ...newSpecification,
                        spec_value: e.target.value
                      })}
                  />
                </Form.Group>
              </Col>
              <Col className='d-flex align-items-end'>
                <Button variant='success' onClick={addSpecification}>
                  Añadir Especificación
                </Button>
              </Col>
            </Row>

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
          <Button variant='secondary' onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={updateProduct}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProductCrud
