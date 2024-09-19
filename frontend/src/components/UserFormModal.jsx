import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const UserFormModal = ({
  showModal,
  handleClose,
  user,
  setUser,
  handleSaveUser,
  isEdit
}) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? 'Editar Usuario' : 'Añadir Usuario'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formName'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ingresa el nombre'
              value={user.name}
              onChange={e => setUser({ ...user, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId='formEmail' className='mt-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Ingresa el email'
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId='formPassword' className='mt-3'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type='password'
              placeholder='Ingresa la contraseña'
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId='formConfirmPassword' className='mt-3'>
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirma la contraseña'
              value={user.confirmPassword}
              onChange={e =>
                setUser({ ...user, confirmPassword: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant='primary' onClick={handleSaveUser}>
          {isEdit ? 'Actualizar' : 'Guardar'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserFormModal
