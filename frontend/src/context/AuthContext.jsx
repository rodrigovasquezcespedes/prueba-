import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)  // Agregado para manejar el rol
  const navigate = useNavigate()

  const login = (userData) => {
    if (userData && userData.user && userData.token) {
      setIsAuthenticated(true)
      setUser(userData.user)
      setRole(userData.role || 'false')
      localStorage.setItem('user', JSON.stringify(userData.user))
      localStorage.setItem('token', userData.token)
      localStorage.setItem('role', userData.role || 'user')  // Asumir 'user' si no se da

      // Redirigir según el rol
      if (userData.role === 'admin') {
        navigate('/admin-dashboard')
      } else {
        navigate('/user-dashboard')
      }
    } else {
      console.error("Error: Datos de usuario inválidos recibidos")
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setRole(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedRole = localStorage.getItem('role')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setRole(storedRole || 'user')
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error)
        localStorage.clear()
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
