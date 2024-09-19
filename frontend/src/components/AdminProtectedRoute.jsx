import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

// AdminProtectedRoute will check if the user is authenticated and an admin
const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext)

  // Check if the user is logged in and has an admin role
  if (!isAuthenticated || !user || user.role !== true) {
    // Redirect to the products page or login if not authorized
    return <Navigate to='/products' />
  }

  // If user is authenticated and is an admin, render the children
  return children
}

export default AdminProtectedRoute
