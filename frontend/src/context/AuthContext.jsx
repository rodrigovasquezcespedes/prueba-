import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = userData => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    navigate('/')
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('user')
    navigate('/login')
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser)
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('user')
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error)
        localStorage.removeItem('user')
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
