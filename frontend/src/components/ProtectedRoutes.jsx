import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  // If the user is authenticated, render the protected content
  return children
}

export default ProtectedRoute
