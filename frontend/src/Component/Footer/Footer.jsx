import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='footer' id='footer'>
<div className="footer-content">
<div className="footer-content-left">
<div className='logo'>Jalpaan Express</div>
<p>Jalpaan Express is your go-to platform for delicious, authentic Indian cuisine delivered right to your doorstep. We bring the flavors of India to you with fresh ingredients and fast service.</p>
<div className="footer-social-icons">
    <img src={assets.facebook_icon} alt="" />
    <img src={assets.twitter_icon} alt="" />
    <img src={assets.linkedin_icon} alt="" />
</div>
    </div>
    
    <div className="footer-content-center">
<h2>COMPANY</h2>
<ul>
    <li onClick={() => navigate("/")}>Home</li>
    <li onClick={() => navigate("/about")}>About us</li>
    <li onClick={() => navigate("/myorders")}>Delivery</li>
    <li >Privacy policy</li>
</ul>
    </div>
    <div className="footer-content-right">
<h2>GET IN TOUCH</h2>
<ul>
    <li>+91 XXXXXXXXXX</li>
    <li>support@jalpaanexpress.com</li>
</ul>
    </div>
</div>
<hr />
<p className="footer-copyright">Copyright 2025 @ Jalpaan Express - All Right Reserved.</p>
    </div>
  )
}

export default Footer