import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:82/api/users/login', loginData); // Send POST request to API
      // setMessage('Login successful!');
      localStorage.setItem('token', response.data.token);                                  // Store token in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));                     // Store user info in localStorage
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Invalid credentials');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
         height: '100vh', // full screen height
         width: '100vw',  // full screen width
         background: 'linear-gradient(135deg, #74ebd5 0%, #9face6 100%)',
       
      }}
    >
      <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '400px', borderRadius: '1rem', backgroundColor:'#0d576982' }}>
        <h2 className="text-center mb-4" style={{ fontWeight: '600' }}>Login</h2>

        {message && (
          <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control rounded-pill"
              id="emailid"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              id="pass"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-pill py-2">
            Login
          </button>

          <div className="text-center mt-3">
            <p className="mb-0">
              Don't have an account?{' '}
              <Link to="/" className="text-decoration-none fw-semibold text-danger">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
