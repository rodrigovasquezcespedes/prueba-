import { createContext, useState, useContext } from 'react'

// Crear el contexto
export const FavoritesContext = createContext()

// Proveedor del contexto
const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([])

  // Función para agregar un producto a favoritos
  const addToFavorites = product => {
    setFavoriteItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (!existingItem) {
        return [...prevItems, product]
      }
      return prevItems
    })
  }

  // Función para eliminar un producto de favoritos
  const removeFromFavorites = id => {
    setFavoriteItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  // Función para verificar si un producto está en favoritos
  const isFavorite = id => {
    return favoriteItems.some(item => item.id === id)
  }

  return (
    <FavoritesContext.Provider
      value={{ favoriteItems, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

// Hook personalizado para acceder al contexto de favoritos
export const useFavorites = () => {
  return useContext(FavoritesContext)
}

export default FavoritesProvider
