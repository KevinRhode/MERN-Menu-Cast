import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import App from './App.jsx'
import ContentServer from './components/ContentServer/index.jsx'
import NotFound from './components/NotFound/index.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Account from './pages/Account.jsx'
import Nav from './components/Nav/index.jsx'
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DataLoader from './utils/DataLoader.jsx'
import CreateSlide from './pages/CreateSlide.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      
      <Router>      
       
        <Routes>
          <Route path='/ss/:id' element={<ContentServer/>}/>
          <Route path='/' element={<App />}>
            <Route index element={<ProtectedRoute><DataLoader><Nav/><Dashboard /></DataLoader></ProtectedRoute>} />
            <Route path='profile' element={<ProtectedRoute><Nav/><Account/></ProtectedRoute>}/>
            <Route path='home' element={<ProtectedRoute><DataLoader><Nav/><Home/></DataLoader></ProtectedRoute>} />
            <Route path='createSlides' element={<ProtectedRoute><DataLoader><Nav/><CreateSlide/></DataLoader></ProtectedRoute>}/>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup/>}/>
            <Route path='*' element={<NotFound/>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>

  </React.StrictMode>,
)
