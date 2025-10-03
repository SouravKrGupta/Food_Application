import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
const Header = () => {

const navigator=useNavigate()
  return (
    <div className='header'>
            <div className="header-contents">
             <h2>Order Your Favourite Food Here</h2>
             <p>Craving delicious meals? From authentic Indian cuisine to international flavors, we deliver fresh, hot food right to your doorstep. Fast delivery, exceptional quality, and unbeatable taste - all at your fingertips.</p>
             <div className="header-buttons">
               <button onClick={() => navigator('/dishes')} className="primary-btn">View Menu</button>
               <button onClick={() => navigator('/about')} className="secondary-btn">Learn More</button>
             </div>
            </div>
          
     </div>
  )
}

export default Header