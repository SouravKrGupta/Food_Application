import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { login } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      toast.success('Login successful');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className='login'>
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>Admin Login</h2>
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
        <button type="submit">Login</button>
        <p>Don't have an account? <span onClick={() => navigate('/register')}>Register here</span></p>
      </form>
    </div>
  );
};

export default Login;