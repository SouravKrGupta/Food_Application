import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const { register } = useContext(AdminContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const result = await register(name, email, password, phone);
    if (result.success) {
      toast.success('Registration successful');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className='register'>
      <form onSubmit={onSubmitHandler} className="register-form">
        <h2>Admin Register</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <p>Already have an account? <span onClick={() => navigate('/login')}>Login here</span></p>
      </form>
    </div>
  );
};

export default Register;