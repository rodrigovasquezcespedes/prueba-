import Navigation from './components/Navigation'
import { Routes, Route } from 'react-router-dom'
import { Home, Profile, NotFound, Shopping, Products, Login, Detail, Favorites, Register, ProductsInsert } from './views'
import Footer from './components/Footer'
import ProtectedRoute from './ProtectedRoute'

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/productos' element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path='/productos/:id' element={
            <ProtectedRoute>
              <Detail />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/productos-insert' element={
            <ProtectedRoute>
              <ProductsInsert />
            </ProtectedRoute>
          }
        />
        <Route
          path='/favoritos' element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path='/carrito' element={
            <ProtectedRoute>
              <Shopping />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
