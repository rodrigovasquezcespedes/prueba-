import { createContext, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Function to handle login and update context
  const login = userData => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/users/logout',
        {},
        { withCredentials: true }
      )
      setIsAuthenticated(false)
      setUser(null)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
