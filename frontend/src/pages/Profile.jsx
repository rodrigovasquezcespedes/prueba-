import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      // Recuperar los datos del usuario desde localStorage
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser)) // Convertir de string a objeto y actualizar el estado
      } else {
        console.error('No se encontraron datos del usuario en localStorage')
        // Si no hay datos del usuario, redirigir al login o manejarlo como desees
        navigate('/login')
      }
    } catch (error) {
      console.error(
        'Error al parsear los datos del usuario desde localStorage:',
        error
      )
      // Manejar errores de parseo (por ejemplo, si el JSON está malformado)
      navigate('/login') // Redirigir al login si hay un error en los datos
    }
  }, [navigate])

  if (!user) {
    return <p>Cargando datos del usuario...</p>
  }

  return (
    <Container className='my-5'>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Card className='p-4'>
            <h3 className='text-center mb-4'>Perfil de Usuario</h3>
            <Card.Body>
              <p>
                <strong>Nombre:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Rol:</strong> {user.role ? 'Administrador' : 'Usuario'}
              </p>
              {/* Puedes mostrar más datos aquí si los tienes */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
