import { useEffect, useState } from 'react'
import axios from 'axios'

const ProductList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id_product}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
