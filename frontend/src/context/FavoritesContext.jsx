import React, { createContext, useContext, useState } from 'react'

// Crear el contexto para los favoritos
const FavoritesContext = createContext()

// Hook para utilizar el contexto de favoritos
export const useFavorites = () => {
  return useContext(FavoritesContext)
}

// Proveedor de favoritos
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  // Función para añadir a favoritos
  const addToFavorites = product => {
    setFavorites(prevFavorites => [...prevFavorites, product])
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
