import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("home");
  const [searchVisible, setSearchVisible] = useState(false);
const {getTotalCartAmount,token,setToken} =useContext(StoreContext)
const navigate= useNavigate();
const logout = ()=>{
localStorage.removeItem('token');
setToken('');
navigate('/');

}
  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };
  return (
    <div className='navbar'>
      <Link to='/'> <img src={assets.logo} alt='' className='logo'/></Link> 
        <ul className="navbar-menu">
            <Link  to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
            <a href='#app-download' onClick={()=>setMenu("moblie-app")} className={menu==="moblie-app"?"active":""}>moblie-app</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
        </ul>
        <div className="navbar-right">

        {searchVisible && (
          <input type="text" placeholder="Search..." className="search-bar"  />
        )}
        <img src={assets.search_icon} alt='' onClick={toggleSearchBar}/>
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
                <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
               </ul>
              </div>
            }
           
        </div>
    </div>
  )
}

export default Navbar