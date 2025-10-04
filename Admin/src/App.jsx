import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import AdminContextProvider, { AdminContext } from './context/AdminContext'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AdminContext);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const url = "http://localhost:4000"
  const { isLoggedIn } = useContext(AdminContext);

  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={
          <ProtectedRoute>
            {isLoggedIn && <Navbar/>}
            {isLoggedIn && <hr />}
            <div className="app-content">
              {isLoggedIn && <Sidebar/>}
              <Routes>
                <Route path='/' element={<Home url={url}/>} />
                <Route path='/add' element={<Add url={url}/>} />
                <Route path='/list' element={<List url={url}/>} />
                <Route path='/orders' element={<Orders url={url}/>} />
                <Route path='/profile' element={<Profile />} />
              </Routes>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

const App = () => {
  return (
    <AdminContextProvider>
      <AppContent />
    </AdminContextProvider>
  )
}

export default App