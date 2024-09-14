import { createContext, useState, useContext } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = product => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id_product === product.id_product
      )
      if (existingItem) {
        // Update quantity if the product already exists
        return prevItems.map(item =>
          item.id_product === product.id_product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      // Add new product with quantity 1
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = id_product => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id_product === id_product
      )
      if (existingItem && existingItem.quantity > 1) {
        // Only reduce quantity if it is greater than 1
        return prevItems.map(item =>
          item.id_product === id_product
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
      // If quantity is 1 or less, do not decrement further
      return prevItems
    })
  }

  const removeItemFromCart = id_product => {
    // Remove the item entirely from the cart
    setCartItems(prevItems =>
      prevItems.filter(item => item.id_product !== id_product)
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
        removeItemFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
