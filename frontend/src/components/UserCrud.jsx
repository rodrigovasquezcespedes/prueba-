import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Button } from 'react-bootstrap'
import UserTable from './UserTable'
import UserFormModal from './UserFormModal'
import { AuthContext } from '../context/AuthContext'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const UserCrud = () => {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [newUser, setNewUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  useEffect(() => {
    if (user && user.role !== true) {
      Swal.fire(
        'Acceso denegado',
        'Solo los administradores pueden gestionar usuarios',
        'error'
      )
    } else {
      fetchUsers()
    }
  }, [user])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/users`, {
        withCredentials: true
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
    }
  }

  const openModal = (isEditMode = false, userData = null) => {
    setIsEdit(isEditMode)

    if (isEditMode && userData) {
      // Si estamos editando, cargar los datos del usuario
      setNewUser({
        id: userData.id_user, // Asegurarse de que el id se esté pasando correctamente
        name: userData.name,
        email: userData.email,
        password: '', // La contraseña debe quedar vacía para no exponerla
        confirmPassword: ''
      })
    } else {
      // Si estamos añadiendo un nuevo usuario, limpiar el formulario
      setNewUser({
        id: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    }

    // Abrir el modal después de asegurarse de que los datos están cargados
    setShowModal(true)
  }

  const handleSaveUser = async () => {
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
        // Actualizar usuario
        await axios.put(
          `${urlBaseServer}/api/users/${newUser.id}`,
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
        fetchUsers() // Refrescar la lista de usuarios después de actualizar
      } else {
        // Crear usuario
        const response = await axios.post(
          `${urlBaseServer}/api/users/register`,
          { ...newUser },
          { withCredentials: true }
        )
        setUsers([...users, response.data])
        Swal.fire(
          'Usuario añadido',
          'El usuario fue añadido correctamente',
          'success'
        )
      }
      setShowModal(false)
      fetchUsers()
    } catch (error) {
      console.error('Error al guardar el usuario:', error)
      Swal.fire('Error', 'No se pudo guardar el usuario', 'error')
    }
  }

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
          withCredentials: true
        })
        setUsers(users.filter(user => user.id_user !== id))
        Swal.fire(
          'Usuario eliminado',
          'El usuario fue eliminado correctamente',
          'success'
        )
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el usuario', 'error')
      }
    }
  }

  return (
    <div>
      <h3>Gestión de Usuarios</h3>
      {user?.role === true && (
        <Button variant='primary' onClick={() => openModal(false)}>
          Añadir Usuario
        </Button>
      )}
      <UserTable
        users={users}
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / usersPerPage)}
        onPageChange={setCurrentPage}
        onEdit={openModal} // Asegurarse de pasar correctamente la función openModal
        onDelete={deleteUser}
      />
      <UserFormModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        user={newUser} // Aquí se pasa el estado newUser como los datos del usuario
        setUser={setNewUser}
        handleSaveUser={handleSaveUser}
        isEdit={isEdit}
      />
    </div>
  )
}

export default UserCrud
