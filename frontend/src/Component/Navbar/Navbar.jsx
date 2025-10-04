import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("home");
  const [searchQuery, setSearchQuery] = useState('');
 const {getTotalCartAmount,token,setToken} =useContext(StoreContext)
 const navigate= useNavigate();
 const logout = ()=>{
 localStorage.removeItem('token');
 setToken('');
 navigate('/');

}
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dishes?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };
  return (
    <div className='navbar'>
      <Link to='/'> <div className='logo'>Jalpaan Express</div></Link>
        <ul className="navbar-menu">
            <Link  to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
            <Link to='/dishes' onClick={()=>setMenu("dishes")} className={menu==="dishes"?"active":""}>menu</Link>
            <Link to='/about' onClick={()=>setMenu("about")} className={menu==="about"?"active":""}>about</Link>
            <Link to='/contact' onClick={()=>setMenu("contact")} className={menu==="contact"?"active":""}>contact us</Link>
            
        </ul>
        <div className="navbar-right">
        <form onSubmit={handleSearch} className="navbar-search">
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <img src={assets.search_icon} alt='' />
          </button>
        </form>
            <div className="navbar-search-icon">
              <Link to='/card'> <img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}>

                </div>
            </div>
            {
              !token? <button onClick={()=>setShowLogin(true)}>sign in</button>:<div className='navbar-profile'>
               <img src={assets.profile_icon} alt='' />
               <ul className="navbar-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon}/><p>Orders</p></li>
                <hr/>
                <li onClick={()=>navigate('/profile')}><img src={assets.profile_icon}/><p>Profile</p></li>
                <hr/>
                <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
               </ul>
              </div>
            }
           
        </div>
    </div>
  )
}

export default Navbar