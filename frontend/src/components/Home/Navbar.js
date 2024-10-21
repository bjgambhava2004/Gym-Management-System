/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import './css/Navbar.css';
import logo from '../../images/Footer/logo.png';
import { FaUserCircle } from 'react-icons/fa'; // React symbol for user icon
import { checkIfAlreadyEnrolled } from '../../Server';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate
  
  // Check localStorage for user_id and user_name when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    const storedUserName = localStorage.getItem('user_name');
    if (storedUserId) {
      setUserId(storedUserId);
      setUserName(storedUserName);
    }

    const data = checkIfAlreadyEnrolled(storedUserId);  // Check enrollment status
    if (data) {
      localStorage.setItem('enrolled', true);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    setUserId(null);
    setUserName('');
    // localStorage.clear()
    navigate('/')
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
          aria-controls="collapsibleNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/AboutUs">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Exercise">Exercise</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Pages
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/AboutUs">About Us</a></li>
                <li><a className="dropdown-item" href="/Exercise">Exercise</a></li>
                <li><a className="dropdown-item" href="/BMICalculator">BMI Calculator</a></li>
                <li><a className="dropdown-item" href="/Gallery">Gallery</a></li>
                <li><a className="dropdown-item" href="*">404</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          {userId ? (
            <div className="d-flex align-items-center">
              <li className="nav-item">
                <a className="Subscrib" href="/subscribe" style={{ marginBottom: '40px', marginRight: '15px', textDecoration: 'none', fontSize: '25px' }}>Subscribe</a>
              </li>
              <a href="/Profile" className="d-flex align-items-center" style={{ color: 'white', textDecoration: 'none' }}>
                <FaUserCircle style={{ fontSize: '24px', marginRight: '8px' }} />
                <span>{userName}</span>
              </a>
              <button className="btn" style={{ color: 'white' }} onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <a href="/login" className="btn btn-outline-light">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
