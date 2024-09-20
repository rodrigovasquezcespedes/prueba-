import { Table, Button, Pagination } from 'react-bootstrap'

const UserTable = ({
  users,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete
}) => {
  const indexOfLastUser = currentPage * 5
  const indexOfFirstUser = indexOfLastUser - 5
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  return (
    <>
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
                  onClick={() => onEdit(true, user)}
                >
                  Actualizar
                </Button>
                <Button variant='danger' onClick={() => onDelete(user.id_user)}>
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
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  )
}

export default UserTable
