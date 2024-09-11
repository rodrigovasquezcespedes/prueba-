import { createContext, useState, useEffect } from 'react'
import { urlBaseServer } from '../config'
import axios from 'axios'

export const TecnoContext = createContext()

const TecnoProvider = ({ children }) => {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])

  const getData = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/products`)
      const data = response.data

      const allData = data.productos.map(producto => ({
        ...producto,
        like: false
      }))

      setProductos(allData)
    } catch (error) {
      console.error('Error fetching products: ', error)
    }
  }

  const formatPrice = price => {
    const formattedPrice = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
    return formattedPrice
  }

  const agregarProducto = producto => {
    // Verificar si el producto ya está en el carrito
    const stockProduct = carrito.find(product => product.id === producto.id)

    const product = {
      id: producto.id,
      name: producto.name,
      description: producto.description,
      price: producto.price,
      imageUrl: producto.imageUrl,
      formattedPrice: formatPrice(producto.price),
      count: 1
    }

    if (stockProduct) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      const updatedCarrito = carrito.map(prod =>
        prod.id === product.id ? { ...prod, count: prod.count + 1 } : prod
      )
      setCarrito(updatedCarrito)
    } else {
      // Si el producto no está en el carrito, agregarlo como un nuevo producto
      setCarrito([...carrito, product])
    }
  }

  const incrementar = index => {
    const updatedCarrito = carrito.map((product, i) =>
      i === index ? { ...product, count: product.count + 1 } : product
    )
    setCarrito(updatedCarrito)
  }

  const decrementar = index => {
    const updatedCarrito = carrito.map((product, i) =>
      i === index && product.count > 1
        ? { ...product, count: product.count - 1 }
        : product
    )
    setCarrito(updatedCarrito.filter(product => product.count > 0))
  }

  const eliminarProducto = index => {
    const updatedCarrito = carrito.filter((_, i) => i !== index)
    setCarrito(updatedCarrito)
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const addAndRemoveFavorite = async productId => {
    try {
      const response = await axios.get(
        `${urlBaseServer}/api/favorites?product_id=${productId}`
      )
      const isFavorite = response.data.length > 0

      if (isFavorite) {
        await axios.delete(
          `${urlBaseServer}/api/favorites/${response.data[0].id_favorite}`
        )
      } else {
        // Agregar a favoritos
        await axios.post(`${urlBaseServer}/api/favorites`, {
          id_product: productId,
          id_user: 1
        })
      }
    } catch (error) {
      console.error('Error al agregar/eliminar favorito:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const dataProductos = {
    productos,
    agregarProducto,
    carrito,
    incrementar,
    decrementar,
    addAndRemoveFavorite,
    formatPrice,
    eliminarProducto,
    vaciarCarrito
  }

  return (
    <TecnoContext.Provider value={dataProductos}>
      {children}
    </TecnoContext.Provider>
  )
}

export default TecnoProvider
