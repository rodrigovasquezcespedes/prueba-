import request from 'supertest'
import app from '../src/app'

describe('Product Routes', () => {
  test('GET /api/products - debería devolver todos los productos', async () => {
    const res = await request(app).get('/api/products')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
  })

  test('POST /api/products - debería crear un nuevo producto', async () => {
    const newProduct = {
      name: 'Nuevo producto',
      description: 'Un gran producto',
      price: 100,
      stock: 10,
      image_url: 'http://example.com/image.jpg',
      brand: 'Marca',
      id_category: 1
    }

    const res = await request(app).post('/api/products').send(newProduct)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id_product')
  })

  test('GET /api/products/:id - debe devolver un producto por ID', async () => {
    const res = await request(app).get('/api/products/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id_product')
  })

  test('PUT /api/products/:id - debería actualizar un producto por ID', async () => {
    const updatedProduct = {
      name: 'Producto actualizado',
      description: 'Un producto actualizado',
      price: 200,
      stock: 20,
      image_url: 'http://example.com/updated-image.jpg',
      brand: 'Marca actualizada',
      id_category: 1
    }

    const res = await request(app).put('/api/products/1').send(updatedProduct)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('name', 'Producto actualizado')
  })

  test('DELETE /api/products/:id - debería eliminar un producto por ID', async () => {
    const res = await request(app).delete('/api/products/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message', 'Producto eliminado exitosamente')
  })
})
