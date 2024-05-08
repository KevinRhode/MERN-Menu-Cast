import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import App from './App.jsx'
import NotFound from './components/NotFound/index.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Nav from './components/Nav/index.jsx'
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <dvi>
        <Nav/>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup/>}/>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
        </dvi>
        
      </Router>
    </AuthProvider>

  </React.StrictMode>,
)
