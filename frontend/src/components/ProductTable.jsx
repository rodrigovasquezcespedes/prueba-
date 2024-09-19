import React from 'react'
import { Table, Button } from 'react-bootstrap'

const ProductTable = ({ currentProducts, editProduct, deleteProduct }) => {
  return (
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
                <Button variant='warning' onClick={() => editProduct(product)}>
                  Editar
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ProductTable
