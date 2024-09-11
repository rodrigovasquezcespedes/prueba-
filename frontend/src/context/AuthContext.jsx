import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const login = () => setIsAuthenticated(true)

  const logout = () => {
    setIsAuthenticated(false)
    navigate('/')
  }

  const authData = {
    isAuthenticated,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
