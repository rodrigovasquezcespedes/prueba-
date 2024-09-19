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
  const [isEdit, setIsEdit] = useState(false) // Para determinar si estamos editando o creando
  const [currentUserId, setCurrentUserId] = useState(null) // Guardar el ID del usuario actual para editar
  const [newUser, setNewUser] = useState({
    id: '',
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
        withCredentials: true // Se asegura de enviar la cookie del token
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Abrir el modal para crear o editar un usuario
  const openModal = (isEditMode = false, userData = null) => {
    setIsEdit(isEditMode)
    if (isEditMode && userData) {
      // Si estamos editando, prellenar el formulario con los datos del usuario
      setNewUser({
        id: userData.id_user,
        name: userData.name,
        email: userData.email,
        password: '', // Dejar vacío para no mostrar la contraseña
        confirmPassword: ''
      })
      setCurrentUserId(userData.id_user)
    } else {
      // Si estamos creando, limpiar el formulario
      setNewUser({
        id: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    }
    setShowModal(true)
  }

  // Agregar o actualizar un usuario mediante la API
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
      if (isEdit) {
        // Actualizar usuario existente
        await axios.put(
          `${urlBaseServer}/api/users/${currentUserId}`,
          {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
          },
          {
            withCredentials: true
          }
        )
        Swal.fire(
          'Usuario actualizado',
          'Los datos del usuario fueron actualizados',
          'success'
        )
      } else {
        // Crear nuevo usuario
        const response = await axios.post(
          `${urlBaseServer}/api/users/register`,
          {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
          },
          {
            withCredentials: true
          }
        )
        if (response.status === 201) {
          Swal.fire(
            'Usuario añadido',
            'El usuario fue añadido correctamente',
            'success'
          )
          setUsers([...users, response.data]) // Añadir el nuevo usuario a la lista
        }
      }
      setShowModal(false) // Cerrar el modal
      setNewUser({ name: '', email: '', password: '', confirmPassword: '' }) // Limpiar el formulario
      fetchUsers() // Refrescar la lista de usuarios
    } catch (error) {
      console.error('Error al guardar el usuario:', error)
      Swal.fire('Error', 'No se pudo guardar el usuario', 'error')
    }
  }

  // Eliminar un usuario de la API con confirmación
  const deleteUser = async id => {
    const confirmation = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`${urlBaseServer}/api/users/${id}`, {
          withCredentials: true // Enviar cookie del token
        })
        setUsers(users.filter(user => user.id_user !== id)) // Eliminar el usuario del estado local
        Swal.fire(
          'Usuario eliminado',
          'El usuario fue eliminado correctamente',
          'success'
        )
      } catch (error) {
        console.error('Error al eliminar el usuario:', error)
        Swal.fire('Error', 'No se pudo eliminar el usuario', 'error')
      }
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
        <Button variant='primary' onClick={() => openModal(false)}>
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
            <tr key={user.id_user}>
              <td>{user.id_user}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  variant='warning'
                  className='me-2'
                  onClick={() => openModal(true, user)}
                >
                  Actualizar
                </Button>
                <Button
                  variant='danger'
                  onClick={() => deleteUser(user.id_user)}
                >
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

      {/* Modal para añadir o actualizar usuario */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? 'Actualizar Usuario' : 'Añadir Usuario'}
          </Modal.Title>
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
                  setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId='formPassword' className='mt-3'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type='password'
                placeholder='Ingresa la contraseña'
                value={newUser.password}
                onChange={e =>
                  setNewUser({ ...newUser, password: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId='formConfirmPassword' className='mt-3'>
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirma la contraseña'
                value={newUser.confirmPassword}
                onChange={e =>
                  setNewUser({ ...newUser, confirmPassword: e.target.value })}
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
