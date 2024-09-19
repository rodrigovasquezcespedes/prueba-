import { Modal, Button, Form } from 'react-bootstrap'

const UserFormModal = ({ showModal, onClose, isEdit, user, onChange, onSave }) => {
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Actualizar Usuario' : 'Añadir Usuario'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formName'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ingresa el nombre'
              value={user.name}
              onChange={e => onChange({ ...user, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId='formEmail' className='mt-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Ingresa el email'
              value={user.email}
              onChange={e => onChange({ ...user, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId='formPassword' className='mt-3'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type='password'
              placeholder='Ingresa la contraseña'
              value={user.password}
              onChange={e => onChange({ ...user, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId='formConfirmPassword' className='mt-3'>
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirma la contraseña'
              value={user.confirmPassword}
              onChange={e => onChange({ ...user, confirmPassword: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Cancelar
        </Button>
        <Button variant='primary' onClick={onSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserFormModal
