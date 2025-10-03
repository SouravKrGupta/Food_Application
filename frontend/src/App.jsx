import React, { useState } from 'react'
import Navbar from './Component/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Card from './pages/Cart/Card'
import PlaceOder from './pages/PlaceOder/PlaceOder'
import Footer from './Component/Footer/Footer'
import LoginPopup from './Component/LoginPopup/LoginPopup'
import MyOrders from './pages/MyOrders/MyOrders'
import Profile from './pages/Profile/Profile'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import Dishes from './pages/Dishes/Dishes'
const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
     {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dishes' element={<Dishes/>}/>
        <Route path='/card'element={<Card/>}/>
        <Route path='/order' element={<PlaceOder/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>

      </Routes>
 
    </div>
    <Footer/>
    </>
  
  )
}

export default App