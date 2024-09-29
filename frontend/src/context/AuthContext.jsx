import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = userData => {
    console.log('User data al iniciar sesión:', userData)
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/api/users/logout', null, {
        withCredentials: true
      })

      setIsAuthenticated(false)
      setUser(null)

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
