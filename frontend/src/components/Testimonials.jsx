import { useState, useEffect } from 'react'
import { Container, Row, Card } from 'react-bootstrap'

const Testimonials = () => {
  const [users, setUsers] = useState([])

  const getUser = async () => {
    const response = await fetch('https://reqres.in/api/users?per_page=3')
    const { data } = await response.json()
    setUsers(data)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (

    <Container>
      <Row className='d-flex justify-content-center gap-5'>
        <h2 className='text-center mt-5 mb-3'>Compartenos tu experiencia</h2>
        {users.map((user) => (
          <Card className='text-center border-0 rounded' key={user.id} style={{ width: '18rem' }}>
            <Card.Img className='rounded-circle' variant='top' src={user.avatar} />
            <Card.Body>
              <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>

  )
}

export default Testimonials
