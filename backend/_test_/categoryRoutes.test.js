import request from 'supertest'
import app from '../src/app'

describe('Category Routes', () => {
  test('GET /api/categories - debería devolver todas las categorías', async () => {
    const res = await request(app).get('/api/categories')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
  })

  test('POST /api/categories - debería crear una nueva categoría', async () => {
    const newCategory = { category_name: 'New Category' }

    const res = await request(app).post('/api/categories').send(newCategory)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id_category')
  })

  test('GET /api/categories/:id - debería devolver una categoría por ID', async () => {
    const res = await request(app).get('/api/categories/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id_category')
  })

  test('PUT /api/categories/:id - debería actualizar una categoría por ID', async () => {
    const updatedCategory = { category_name: 'Categoría actualizada' }

    const res = await request(app)
      .put('/api/categories/1')
      .send(updatedCategory)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('category_name', 'Categoría actualizada')
  })

  test('DELETE /api/categories/:id - debería eliminar una categoría por ID', async () => {
    const res = await request(app).delete('/api/categories/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message', 'Categoría eliminada exitosamente')
  })
})
