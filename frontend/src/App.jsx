import { Routes, Route, HashRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Products from './pages/Products'
import Profile from './pages/Profile'
import ShoppingCart from './pages/ShoppingCart'
import Favorites from './pages/Favorites'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Detail from './pages/Detail'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <HashRouter>
      <AuthProvider> {/* Use the named AuthProvider */}
        <CartProvider>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/shoppingcart' element={<ShoppingCart />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
