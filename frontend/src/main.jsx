import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter } from 'react-router-dom'
import TecnoProvider from './context/TecnoContext.jsx'
import AuthProvider from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <TecnoProvider>
          <App />
        </TecnoProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
)
