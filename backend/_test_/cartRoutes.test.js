import request from 'supertest'
import app from '../src/app'

describe('Cart Routes', () => {
  test('GET /api/cart/:userId - Debe devolver el carrito de un usuario', async () => {
    const res = await request(app).get('/api/cart/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('cart')
    expect(res.body).toHaveProperty('items')
  })

  test('POST /api/cart/:userId/items - debería agregar un artículo al carrito', async () => {
    const newItem = { id_product: 1, quantity: 2 }

    const res = await request(app).post('/api/cart/1/items').send(newItem)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id_cart_item')
  })

  test('PUT /api/cart/:userId/items - debe actualizar la cantidad de un artículo en el carrito', async () => {
    const updatedItem = { id_product: 1, quantity: 3 }

    const res = await request(app).put('/api/cart/1/items').send(updatedItem)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('quantity', 3)
  })

  test('DELETE /api/cart/:userId/items/:productId - debería eliminar un artículo del carrito', async () => {
    const res = await request(app).delete('/api/cart/1/items/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message', 'Artículo eliminado del carrito')
  })
})
