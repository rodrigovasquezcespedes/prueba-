import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import Swal from 'sweetalert2'
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const urlBaseServer = 'http://localhost:3000' // Asegúrate de que sea tu URL base del servidor

  const handleSubmit = async e => {
    e.preventDefault()

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Las contraseñas no coinciden'
      })
      return
    }

    try {
      // Enviar solicitud POST al backend para registrar al usuario
      const response = await axios.post(`${urlBaseServer}/api/users/register`, {
        name: user,
        email,
        password
      })

      // Si el registro es exitoso
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
          timer: 2000
        })
        navigate('/productos')
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Hubo un problema al registrar el usuario, por favor intenta nuevamente'
      })
    }
  }

  return (
    <Container className='my-5'>
      <Row>
        <Form
          onSubmit={handleSubmit}
          className='col-10 col-sm-8 col-md-6 col-lg-4 m-auto border border-light-subtle rounded-5 p-5 mt-5'
        >
          <legend className='mb-3 text-center'>
            ¿Aún no te has registrado?
          </legend>

          <Form.Group className='mt-2'>
            <Form.Label>Ingresa tu nombre de usuario</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaUser />
              </InputGroup.Text>
              <Form.Control
                type='text'
                onChange={e => setUser(e.target.value)}
                value={user}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className='mt-2'>
            <Form.Label>Ingresa tu email</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <MdAlternateEmail />
              </InputGroup.Text>
              <Form.Control
                type='email'
                onChange={e => setEmail(e.target.value)}
                value={email}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className='mt-2'>
            <Form.Label>Crea una contraseña</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <RiLockPasswordFill />
              </InputGroup.Text>
              <Form.Control
                type='password'
                name='password'
                autoComplete='off'
                onChange={e => setPassword(e.target.value)}
                value={password}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className='mt-2'>
            <Form.Label>Repite la contraseña</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <RiLockPasswordFill />
              </InputGroup.Text>
              <Form.Control
                type='password'
                name='confirm'
                autoComplete='off'
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </InputGroup>
          </Form.Group>

          <div className='text-center'>
            <Button className='mt-3 px-5' type='submit' variant='dark'>
              Enviar
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  )
}

export default Register
