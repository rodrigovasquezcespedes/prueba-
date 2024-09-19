import { useState, useEffect, useContext } from 'react'
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
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  useEffect(() => {
    if (user && user.role !== true) {
      Swal.fire('Acceso denegado', 'Solo los administradores pueden gestionar usuarios', 'error')
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
      setNewUser({
        id: userData.id_user,
        name: userData.name,
        email: userData.email,
        password: '',
        confirmPassword: ''
      })
    } else {
      setNewUser({ name: '', email: '', password: '', confirmPassword: '' })
    }
    setShowModal(true)
  }

  const saveUser = async () => {
    if (newUser.password !== newUser.confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Error en el registro', text: 'Las contraseñas no coinciden' })
      return
    }

    try {
      if (isEdit) {
        await axios.put(`${urlBaseServer}/api/users/${newUser.id}`, { ...newUser }, { withCredentials: true })
        Swal.fire('Usuario actualizado', 'Los datos del usuario fueron actualizados', 'success')
      } else {
        const response = await axios.post(`${urlBaseServer}/api/users/register`, { ...newUser }, { withCredentials: true })
        if (response.status === 201) {
          setUsers([...users, response.data])
          Swal.fire('Usuario añadido', 'El usuario fue añadido correctamente', 'success')
        }
      }
      setShowModal(false)
      fetchUsers()
    } catch (error) {
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
        await axios.delete(`${urlBaseServer}/api/users/${id}`, { withCredentials: true })
        setUsers(users.filter(user => user.id_user !== id))
        Swal.fire('Usuario eliminado', 'El usuario fue eliminado correctamente', 'success')
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
        onEdit={openModal}
        onDelete={deleteUser}
      />
      <UserFormModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        isEdit={isEdit}
        user={newUser}
        onChange={setNewUser}
        onSave={saveUser}
      />
    </div>
  )
}

export default UserCrud
