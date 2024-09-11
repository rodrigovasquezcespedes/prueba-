import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { Container, Row } from 'react-bootstrap'
import FormPost from '../components/FormPost'
import Articulos from '../components/Articulos'

const urlBaseServer = 'http://localhost:3000'

const Profile = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const [nombre, setNombre] = useState('')
  const [img, setImg] = useState('')
  const [desc, setDesc] = useState('')
  const [precio, setPrecio] = useState('')
  const [marca, setMarca] = useState('')
  const [articulos, setArticulos] = useState([])

  if (!isAuthenticated) {
    logout()
  }

  const vaciarFormulario = () => {
    setNombre('')
    setImg('')
    setDesc('')
    setPrecio('')
    setMarca('')
  }

  // Obtener los productos desde la base de datos
  const getArticulos = async () => {
    try {
      const { data: articulos } = await axios.get(urlBaseServer + '/api/products')
      setArticulos(articulos)
    } catch (error) {
      console.error('Error al obtener productos', error)
    }
  }

  // Agregar un nuevo producto a la base de datos
  const agregarArticulo = async () => {
    try {
      const producto = {
        name: nombre,
        imageUrl: img,
        description: desc,
        price: parseInt(precio, 10), // Asegurar que el precio sea un número
        brand: marca
      }
      await axios.post(urlBaseServer + '/api/products', producto)
      getArticulos()
      vaciarFormulario()
    } catch (error) {
      console.error('Error al agregar el producto', error)
    }
  }

  // Eliminar un producto de la base de datos
  const eliminarArticulo = async (id) => {
    try {
      await axios.delete(urlBaseServer + `/api/products/${id}`)
      getArticulos()
    } catch (error) {
      console.error('Error al eliminar el producto', error)
    }
  }

  useEffect(() => {
    getArticulos()
  }, [])

  return (
    <Container className='text-center my-5'>
      <Row>
        <h2>Welcome</h2>
      </Row>

      <Container>
        <Row>
          {/* Formulario para agregar productos */}
          <FormPost
            setNombre={setNombre}
            setImg={setImg}
            setDesc={setDesc}
            setMarca={setMarca}
            setPrecio={setPrecio}
            agregarArticulo={agregarArticulo}
          />

          {/* Listar los productos obtenidos de la base de datos */}
          {articulos.map((articulo, index) => (
            <Articulos
              key={index}
              articulo={articulo}
              eliminarArticulo={eliminarArticulo}
            />
          ))}
        </Row>
      </Container>
    </Container>
  )
}

export default Profile
