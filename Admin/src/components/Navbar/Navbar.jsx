import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <div className='logo'>Jalpaan Express</div>
      <div className="navbar-right">
        <div className='navbar-profile'>
          <img src={assets.profile_image} alt='' />
          <ul className="navbar-profile-dropdown">
            <li onClick={()=>navigate('/profile')}><img src={assets.profile_image}/><p>Profile</p></li>
            <hr/>
            <li onClick={handleLogout}><img src={assets.parcel_icon}/><p>Logout</p></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar