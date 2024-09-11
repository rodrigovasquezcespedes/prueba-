import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import Swal from 'sweetalert2'
import axios from 'axios'
import { urlBaseServer } from '../config'

const Login = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email.trim() === '' || password.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Debes completar todos los campos'
      })
      return
    }

    if (email === 'admin@example.com' && password === '1234') {
      login()
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 3000
      })
      navigate('/productos')
    } else {
      try {
        const response = await axios.post(`${urlBaseServer}/api/users/login`, { email, password })

        if (response.status === 200) {
          login()
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 2000
          })
          navigate('/productos')
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Correo o contraseña incorrectos'
        })
      }
    }
  }

  return (
    <Container className='my-5'>
      <Form onSubmit={handleSubmit} className='col-10 col-sm-8 col-md-6 col-lg-4 m-auto border border-light-subtle rounded-5 p-5 mt-5'>
        <legend className='mb-3 text-center'>Inicia Sesión</legend>
        <Form.Group className='mt-2'>
          <Form.Label>Ingresa tu correo electrónico</Form.Label>
          <InputGroup>
            <InputGroup.Text><FaUser /></InputGroup.Text>
            <Form.Control
              type='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className='mt-2'>
          <Form.Label>Ingresa tu contraseña</Form.Label>
          <InputGroup>
            <InputGroup.Text><RiLockPasswordFill /></InputGroup.Text>
            <Form.Control
              type='password'
              name='password'
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </InputGroup>
        </Form.Group>

        <div className='text-center'>
          <Button className='mt-3 px-5' type='submit' variant='dark'>Enviar</Button>
        </div>
      </Form>
    </Container>
  )
}

export default Login
