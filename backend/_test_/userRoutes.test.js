import request from 'supertest'
import app from '../src/app'

describe('User Routes', () => {
  test('GET /api/users -debería devolver todos los usuarios', async () => {
    const res = await request(app).get('/api/users')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
  })

  test('POST /api/users - debería crear un nuevo usuario', async () => {
    const newUser = {
      name: 'rodrigo3',
      email: 'rodrigo3@example.com',
      password: 'password123',
      role: false
    }

    const res = await request(app).post('/api/users').send(newUser)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id_user')
  })

  test('GET /api/users/:id - debería devolver un usuario por ID', async () => {
    const res = await request(app).get('/api/users/5')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id_user')
  })

  test('PUT /api/users/:id - debería actualizar un usuario por ID', async () => {
    const updatedUser = {
      name: 'Rodrigo Updated',
      email: 'rodrigo@example.com',
      password: 'password124',
      role: false
    }

    const res = await request(app).put('/api/users/5').send(updatedUser)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('name', 'cristian actualizado')
  })

  test('DELETE /api/users/:id - debería eliminar un usuario por ID', async () => {
    const res = await request(app).delete('/api/users/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message', 'Usuario eliminada exitosamente')
  })
})
