import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext)

  if (!isAuthenticated || !user || user.role !== true) {
    return <Navigate to='/products' />
  }

  return children
}

export default AdminProtectedRoute
