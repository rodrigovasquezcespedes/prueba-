import { Container, Row, Button, Form, InputGroup } from 'react-bootstrap'

const FormPost = ({ setNombre, setImg, setDesc, setMarca, setPrecio, agregarArticulo }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit} className='col-10 col-sm-8 col-md-6 col-lg-4 m-auto border border-light-subtle rounded-5 p-5 mt-5'>
          <legend className='mb-3 text-center'>Vende tus productos</legend>
          <Form.Group className='mt-2'>
            <Form.Label>Nombre</Form.Label>
            <InputGroup>
              <Form.Control
                type='text'
                onChange={(e) => setNombre(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className='mt-2'>
            <Form.Label>Img</Form.Label>
            <InputGroup>
              <Form.Control
                type='text'
                onChange={(e) => setImg(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className='mt-2'>
            <Form.Label>Descripcion</Form.Label>
            <InputGroup>
              <Form.Control
                type='text'
                onChange={(e) => setDesc(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className='mt-2'>
            <Form.Label>Marca</Form.Label>
            <InputGroup>
              <Form.Control
                type='text'
                onChange={(e) => setMarca(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className='mt-2'>
            <Form.Label>Precio</Form.Label>
            <InputGroup>
              <Form.Control
                type='text'
                onChange={(e) => setPrecio(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <div className='text-center'>
            <Button onClick={agregarArticulo} className='mt-3 px-5' type='submit' variant='dark'>Publicar</Button>
          </div>
        </Form>
      </Row>
    </Container>
  )
}

export default FormPost
