import React, { useState, useEffect, useContext } from 'react'
import { Table, Button, Form, Modal, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext' // Para verificar si el usuario es administrador
import Swal from 'sweetalert2'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const UserCrud = () => {
  const { user } = useContext(AuthContext) // Obtener el usuario actual del contexto
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  // Verificar si el usuario es administrador
  useEffect(() => {
    if (user && user.role !== true) {
      Swal.fire(
        'Acceso denegado',
        'Solo los administradores pueden gestionar usuarios',
        'error'
      )
    }
  }, [user])

  // Obtener los usuarios desde la API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/users`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}` // Token de sesión almacenado
        },
        withCredentials: true // Enviar cookies con la solicitud
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Validar que las contraseñas coinciden y guardar el usuario
  const saveUser = async () => {
    if (newUser.password !== newUser.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Las contraseñas no coinciden'
      })
      return
    }

    try {
      const response = await axios.post(
        `${urlBaseServer}/api/users/register`,
        {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          },
          withCredentials: true
        }
      )

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario añadido',
          text: 'El usuario fue añadido correctamente',
          showConfirmButton: false,
          timer: 2000
        })

        setUsers([...users, response.data]) // Añadir el nuevo usuario a la lista
        setShowModal(false) // Cerrar el modal
        setNewUser({ name: '', email: '', password: '', confirmPassword: '' }) // Limpiar el formulario
      }
    } catch (error) {
      console.error('Error al guardar el usuario:', error)
      Swal.fire('Error', 'No se pudo guardar el usuario', 'error')
    }
  }

  // Eliminar un usuario de la API
  const deleteUser = async id => {
    try {
      await axios.delete(`${urlBaseServer}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        withCredentials: true
      })

      setUsers(users.filter(user => user.id !== id)) // Eliminar el usuario del estado local

      Swal.fire({
        icon: 'success',
        title: 'Usuario eliminado',
        text: 'El usuario fue eliminado correctamente',
        showConfirmButton: false,
        timer: 2000
      })
    } catch (error) {
      console.error('Error al eliminar el usuario:', error)
      Swal.fire('Error', 'No se pudo eliminar el usuario', 'error')
    }
  }

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / usersPerPage)

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <h3>Gestión de Usuarios</h3>
      {/* Mostrar el botón solo si el usuario es administrador */}
      {user?.role === true && (
        <Button variant='primary' onClick={() => setShowModal(true)}>
          Añadir Usuario
        </Button>
      )}

      {/* Tabla de usuarios paginada */}
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant='danger' onClick={() => deleteUser(user.id)}>
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

      {/* Modal para añadir usuario */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formName'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa el nombre'
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId='formEmail' className='mt-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Ingresa el email'
                value={newUser.email}
                onChange={e =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId='formPassword' className='mt-3'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type='password'
                placeholder='Ingresa la contraseña'
                value={newUser.password}
                onChange={e =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId='formConfirmPassword' className='mt-3'>
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirma la contraseña'
                value={newUser.confirmPassword}
                onChange={e =>
                  setNewUser({ ...newUser, confirmPassword: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={saveUser}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserCrud
