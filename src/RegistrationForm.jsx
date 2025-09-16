import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({                    // State to hold form data
    fname: '',
    lname: '',
    phone: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();                               // React Router navigation hook

  const handleChange = (e) => {                              //handle input changes
    const { name, value } = e.target;                        // Destructure name and value from event target
    setFormData(prev => ({                                  // Update form data state
      ...prev,                                              // Spread previous state
      [name]: value                     // Update specific field
    }));
  };

  const handleSubmit = async (e) => {                 // Handle form submission
    e.preventDefault();                               // Prevent default form submission behavior

    const payload = {                       // Prepare payload for API
      name: formData.fname,
      lastname: formData.lname,
      mobno: formData.phone,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await axios.post('http://localhost:82/api/users/register', payload); // Send POST request to API
      setFormData({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        password: ''
      });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert('User already exists or registration failed');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh', // full screen height
        width: '100vw',  // full screen width
        background: 'linear-gradient(135deg, #aceb74ff 0%, #9face6 100%)',
        padding: '20px',
      }}
    >
      <div
        className="card p-5 shadow-lg border-0"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '2rem',
          backgroundColor: '#2093b082',
        }}
      >
        <h2 className="mb-1 text-center">Create an Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fname" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control rounded-pill px-3"
              id="fname"
              name="fname"
              placeholder="Enter First Name"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lname" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control rounded-pill px-3"
              id="lname"
              name="lname"
              placeholder="Enter Last Name"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control rounded-pill px-3"
              id="phone"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email1" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control rounded-pill px-3"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-pill px-3"
              id="password1"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-2"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-decoration-none text-primary fw-bold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
