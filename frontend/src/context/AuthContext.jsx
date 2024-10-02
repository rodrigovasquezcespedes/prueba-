import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Cargar el usuario desde sessionStorage al montar la aplicación
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = userData => {
    console.log('User data al iniciar sesión:', userData)
    setUser(userData)
    setIsAuthenticated(true)
    // Guardar usuario en sessionStorage
    sessionStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/api/users/logout', null, {
        withCredentials: true
      })

      setIsAuthenticated(false)
      setUser(null)
      // Limpiar sessionStorage al cerrar sesión
      sessionStorage.removeItem('user')

      navigate('/products')
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
