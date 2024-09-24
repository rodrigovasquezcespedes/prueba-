import React, { createContext, useContext, useState, useEffect } from 'react'

// Crear el contexto para los favoritos
const FavoritesContext = createContext()

// Hook para utilizar el contexto de favoritos
export const useFavorites = () => {
  return useContext(FavoritesContext)
}

// Proveedor de favoritos
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Intentar cargar los favoritos desde localStorage
    const savedFavorites = localStorage.getItem('favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  // Guardar los favoritos en localStorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  // Función para añadir a favoritos
  const addToFavorites = product => {
    setFavorites(prevFavorites => {
      // Verificar si el producto ya está en favoritos
      const isAlreadyFavorite = prevFavorites.some(
        favorite => favorite.id_product === product.id_product
      )
      if (isAlreadyFavorite) {
        return prevFavorites // No añadir duplicados
      }
      return [...prevFavorites, product]
    })
  }

  // Función para eliminar de favoritos
  const removeFromFavorites = productId => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(favorite => favorite.id_product !== productId)
    )
  }

  // Valor que se pasa a los componentes hijos
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
