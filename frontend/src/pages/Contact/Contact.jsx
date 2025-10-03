import React, { useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const { url } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/contact/submit`, formData);
      if (response.data.success) {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <div className='contact'>
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <h3>Get in Touch</h3>
              <p>Have questions about our service or need help with your order?</p>
            </div>
            <div className="info-item">
              <h3>📧 Email</h3>
              <p>support@jalpaanexpress.com</p>
            </div>
            <div className="info-item">
              <h3>📞 Phone</h3>
              <p>+91-XXXXXXXXXX</p>
            </div>
            <div className="info-item">
              <h3>🕒 Business Hours</h3>
              <p>Monday - Sunday: 8:00 AM - 10:00 PM</p>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;