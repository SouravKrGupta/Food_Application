import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className='about'>
      <div className="about-content">
        <h1>About Jalpaan Express</h1>
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Welcome to Jalpaan Express, your ultimate destination for authentic and delicious food delivery.
            We are passionate about bringing you the finest culinary experiences right to your doorstep.
          </p>
          <p>
            Founded with a vision to revolutionize food delivery, Jalpaan Express connects you with the best
            restaurants and local eateries in your area. Our platform ensures that you get fresh, hot, and
            delicious meals without compromising on quality or taste.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make food ordering simple, fast, and enjoyable. We strive to provide:
          </p>
          <ul>
            <li>Wide variety of cuisines from top-rated restaurants</li>
            <li>Lightning-fast delivery service</li>
            <li>Secure and easy payment options</li>
            <li>Excellent customer support</li>
            <li>Quality assurance for every order</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <div className="features">
            <div className="feature">
              <h3>Quality First</h3>
              <p>We partner with only the best restaurants and ensure every meal meets our high standards.</p>
            </div>
            <div className="feature">
              <h3>Fast Delivery</h3>
              <p>Our efficient delivery network ensures your food arrives hot and fresh.</p>
            </div>
            <div className="feature">
              <h3>Easy Ordering</h3>
              <p>Simple and intuitive interface makes ordering food a breeze.</p>
            </div>
            <div className="feature">
              <h3>Customer Satisfaction</h3>
              <p>Your satisfaction is our priority. We're here to make every meal memorable.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions or feedback? We'd love to hear from you!
          </p>
          <p>
            Email: support@jalpaanexpress.com<br/>
            Phone: +91-XXXXXXXXXX
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;