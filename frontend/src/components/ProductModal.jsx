import React from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const ProductModal = ({
  showModal,
  handleClose,
  newProduct,
  setNewProduct,
  addSpecification,
  deleteSpecification,
  newSpecification,
  setNewSpecification,
  handleSaveProduct,
  isEdit
}) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? 'Editar Producto' : 'Añadir Producto'}
        </Modal.Title>
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
        <Button variant='secondary' onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant='primary' onClick={handleSaveProduct}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductModal
