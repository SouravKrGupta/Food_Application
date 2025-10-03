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
      <img className="logo" src={assets.logo} alt="" />
      <div className="navbar-right">
        <img
          className='profile'
          src={assets.profile_image}
          alt=""
          onClick={() => navigate('/profile')}
          style={{ cursor: 'pointer' }}
        />
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  )
}

export default Navbar