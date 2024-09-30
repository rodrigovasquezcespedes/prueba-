import { Routes, Route, HashRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Products from './pages/Products'
import Profile from './pages/Profile'
import ShoppingCart from './pages/ShoppingCart'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Detail from './pages/Detail'
import NotFound from './pages/NotFound'

import AdminProtectedRoute from './components/AdminProtectedRoute'
import ProtectedRoute from './components/ProtectedRoutes'

const App = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/shoppingcart' element={<ShoppingCart />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard'
              element={
                <AdminProtectedRoute>
                  <Dashboard />
                </AdminProtectedRoute>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
