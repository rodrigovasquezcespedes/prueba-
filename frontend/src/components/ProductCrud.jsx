import React, { useState, useEffect } from 'react'
import { Button, Pagination, Form, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import ProductTable from './ProductTable'
import ProductModal from './ProductModal'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const ProductCrud = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    id_product: '',
    name: '',
    price: '',
    description: '',
    stock: '',
    imageUrl: '',
    specifications: []
  })
  const [newSpecification, setNewSpecification] = useState({
    spec_name: '',
    spec_value: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 5

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/products`)
      setProducts(response.data)
    } catch (error) {
      console.error('Error al obtener los productos:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/categories`)
      setCategories(response.data)
    } catch (error) {
      console.error('Error al obtener las categorías:', error)
    }
  }

  // Filtrar productos por categoría
  const filteredProducts = products.filter(product => {
    return !selectedCategory || product.id_category === Number(selectedCategory)
  })

  const addSpecification = () => {
    setNewProduct(prevState => ({
      ...prevState,
      specifications: [...prevState.specifications, newSpecification]
    }))
    setNewSpecification({ spec_name: '', spec_value: '' })
  }

  const deleteSpecification = index => {
    setNewProduct(prevState => ({
      ...prevState,
      specifications: prevState.specifications.filter((_, i) => i !== index)
    }))
  }

  const handleSaveProduct = async () => {
    if (editingProduct) {
      await updateProduct()
    } else {
      await addProduct()
    }
    setShowModal(false)
  }

  const addProduct = async () => {
    try {
      const response = await axios.post(
        `${urlBaseServer}/api/products`,
        newProduct,
        {
          withCredentials: true
        }
      )
      setProducts([...products, response.data])
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
          await axios.delete(`${urlBaseServer}/api/products/${idProduct}`, {
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

  const editProduct = product => {
    setNewProduct(product)
    setEditingProduct(product.id_product)
    setShowModal(true)
  }

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  return (
    <div>
      <h3>Gestión de Productos</h3>

      {/* Filtro por categoría, junto con el botón "Añadir Producto" */}
      <Row className='align-items-center mb-3'>
        <Col md={2}>
          <Button variant='primary' onClick={() => setShowModal(true)}>
            Añadir Producto
          </Button>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as='select'
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value=''>Todas</option>
              {categories.map(category => (
                <option key={category.id_category} value={category.id_category}>
                  {category.category_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <ProductTable
        currentProducts={currentProducts}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />

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

      <ProductModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        addSpecification={addSpecification}
        deleteSpecification={deleteSpecification}
        newSpecification={newSpecification}
        setNewSpecification={setNewSpecification}
        handleSaveProduct={handleSaveProduct}
        isEdit={!!editingProduct}
      />
    </div>
  )
}

export default ProductCrud
