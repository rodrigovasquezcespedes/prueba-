import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = product => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id_product === product.id_product
      )
      if (existingItem) {
        return prevItems.map(item =>
          item.id_product === product.id_product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }
  const removeFromCart = productId => {
    setCartItems(prevItems => {
      return prevItems
        .map(item =>
          item.id_product === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    })
  }

  const deleteFromCart = productId => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id_product !== productId)
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
