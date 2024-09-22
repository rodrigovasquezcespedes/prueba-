import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import Swal from 'sweetalert2'
import axios from 'axios'
import Cookies from 'js-cookie'

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER

const Login = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    // Verificar campos vacíos
    if (email.trim() === '' || password.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Debes completar todos los campos'
      })
      return
    }

    try {
      const response = await axios.post(
        `${urlBaseServer}/api/users/login`,
        {
          email,
          password
        },
        {
          withCredentials: true // Asegura que se envíen las cookies
        }
      )

      if (response.status === 200) {
        const { user, token } = response.data // Obtener el token y los datos del usuario

        // Guardar el token en la cookie
        Cookies.set('token', token, {
          expires: 1, // La cookie expira en 1 día
          secure: true, // Asegura que solo se envíe por HTTPS
          sameSite: 'Strict'
        })

        // Actualizar el estado global de autenticación
        login(user)

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 2000
        })

        navigate('/products') // Redirigir a la página de productos
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)

      // Mostrar un mensaje de error si la autenticación falla
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text:
          error.response?.data?.message ||
          'Hubo un problema al intentar iniciar sesión, por favor inténtalo de nuevo'
      })
    }
  }

  return (
    <Container className='my-5'>
      <Form
        onSubmit={handleSubmit}
        className='col-10 col-sm-8 col-md-6 col-lg-4 m-auto border border-light-subtle rounded-5 p-5 mt-5'
      >
        <legend className='mb-3 text-center'>Inicia Sesión</legend>
        <Form.Group className='mt-2'>
          <Form.Label>Ingresa tu correo electrónico</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaUser />
            </InputGroup.Text>
            <Form.Control
              type='email'
              name='email'
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className='mt-2'>
          <Form.Label>Ingresa tu contraseña</Form.Label>
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

        <div className='text-center'>
          <Button className='mt-3 px-5' type='submit' variant='dark'>
            Enviar
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default Login
