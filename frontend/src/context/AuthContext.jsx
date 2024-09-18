import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Función para verificar el estado de autenticación al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/auth/check',
          {
            withCredentials: true
          }
        )
        if (response.data.user) {
          setUser(response.data.user)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
      }
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        { withCredentials: true }
      )
      if (response.data.user) {
        setUser(response.data.user)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    }
  }

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/auth/logout',
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
