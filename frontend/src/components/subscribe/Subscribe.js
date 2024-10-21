import React, { useState, useEffect } from 'react';
import './Subscribe.css';  // Your custom styles
import Navbar from '../Home/Navbar';  // Import Navbar
import Footer from '../Home/Footer';  // Import Footer
import Breadcrumb from '../Breadcrumb';

import { checkIfAlreadyEnrolled } from '../../Server';
function Subscribe() {
  const [userId, setUserId] = useState('');
  const [plan, setPlan] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [amount, setAmount] = useState(0);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);  // To track enrollment status
  const breadcrumbLinks = [
    { href: '/', text: 'Home' },
  ];
  useEffect(() => {
    const fetchData = async () => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId);
            const data = await checkIfAlreadyEnrolled(storedUserId);  // Check enrollment status
            
            if (data) {
                setAlreadyEnrolled(true);
            }
        }
        generateCaptcha();
    };

    fetchData();
}, []);


  // Update amount whenever the plan changes
  useEffect(() => {
    switch (plan) {
      case "1 Month":
        setAmount(1000);
        break;
      case "6 Month":
        setAmount(5000);
        break;
      case "12 Month":
        setAmount(10000);
        break;
      default:
        setAmount(0);
    }
  }, [plan]);  // This effect runs whenever `plan` changes

  // Check if user is already enrolled
  

  // Generate random captcha
  const generateCaptcha = () => {
    const captcha = Math.floor(1000 + Math.random() * 9000);
    setGeneratedCaptcha(captcha);
  };

  const handleEnroll = (planName) => {
    if (!userId) {
      alert("User ID not found. Please log in.");
      return;
    }

    if (alreadyEnrolled) {
      alert("You are already enrolled in a plan.");
      return;
    }

    setPlan(planName);
    setShowPaymentForm(true);
    generateCaptcha();
  };

  const validateForm = () => {
    if (!userId || !plan || !cardNumber || !cvv || !captcha) {
      return false;
    }
    return true;
  };

  const checkCaptcha = () => {
    if (parseInt(captcha) !== generatedCaptcha) {
      setCaptchaError('Incorrect captcha.');
      generateCaptcha();
      return false;
    }
    setCaptchaError('');
    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill in all fields correctly.");
      return;
    }

    if (!checkCaptcha()) {
      return;
    }

    const data = {
      user_id: userId,  // Include the user_id in the data
      plan,
      card_number: cardNumber,
      cvv,
    };

    const response = await fetch(`http://localhost:8000/account/api/process_payment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Payment successful!");
      setFormSubmitted(true);
      setShowPaymentForm(false);
      window.location.reload();
    } else {
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <Breadcrumb title="subscribe" links={breadcrumbLinks} />

      <section className="pricing-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Our Plan</span>
                <h2>Choose your pricing plan</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-8">
              <div className="ps-item">
                <h3>1 Month Plan</h3>
                <div className="pi-price">
                  <h2>1000 {'\u20B9'}</h2>
                  <ul>
                    <li>Free riding</li>
                    <li>Unlimited equipments</li>
                    <li>Personal trainer</li>
                    <li>Weight losing classes</li>
                    <li>Month to mouth</li>
                    <li>No time restriction</li>
                  </ul>
                </div>
                <button 
                  onClick={() => handleEnroll("1 Month")} 
                  className="primary-btn pricing-btn" 
                  disabled={alreadyEnrolled}> 
                  {alreadyEnrolled ? "Already Enrolled" : "Enroll now"}
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-md-8">
              <div className="ps-item">
                <h3>6 Month Plan</h3>
                <div className="pi-price">
                  <h2>5000 {'\u20B9'}</h2>
                  <ul>
                  <li>Free riding</li>
                  <li>Unlimited equipments</li>
                  <li>Personal trainer</li>
                  <li>Weight losing classes</li>
                  <li>Month to mouth</li>
                  <li>No time restriction</li>
                </ul>
                </div>
                <button 
                  onClick={() => handleEnroll("6 Month")} 
                  className="primary-btn pricing-btn" 
                  disabled={alreadyEnrolled}>
                  {alreadyEnrolled ? "Already Enrolled" : "Enroll now"}
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-md-8">
              <div className="ps-item">
                <h3>12 Month Plan</h3>
                <div className="pi-price">
                  <h2>10000 {'\u20B9'}</h2>
                  <ul>
                  <li>Free riding</li>
                  <li>Unlimited equipments</li>
                  <li>Personal trainer</li>
                  <li>Weight losing classes</li>
                  <li>Month to mouth</li>
                  <li>No time restriction</li>
                </ul>
                </div>
                <button 
                  onClick={() => handleEnroll("12 Month")} 
                  className="primary-btn pricing-btn" 
                  disabled={alreadyEnrolled}>
                  {alreadyEnrolled ? "Already Enrolled" : "Enroll now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showPaymentForm && !alreadyEnrolled && (
        <section className="payment-section">
          <div className="container">
            <h2>Make Payment</h2>
            <form onSubmit={handlePayment} className="payment-form">
              <div className="form-group">
                <label htmlFor="userId">User ID:</label>
                <input 
                  type="text" 
                  id="userId" 
                  value={userId} 
                  onChange={(e) => setUserId(e.target.value)} 
                  disabled 
                />
              </div>

              <div className="form-group">
                <label htmlFor="plan">Choose Plan:</label>
                <select 
                  id="plan" 
                  value={plan} 
                  onChange={(e) => setPlan(e.target.value)} 
                  required>
                  <option value="">Select a plan</option>
                  <option value="1 Month">1 Month</option>
                  <option value="6 Month">6 Month</option>
                  <option value="12 Month">12 Month</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cardNumber">Enter Card Number:</label>
                <input 
                  type="text" 
                  id="cardNumber" 
                  value={cardNumber} 
                  onChange={(e) => setCardNumber(e.target.value)} 
                  maxLength="16" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">Enter CVV:</label>
                <input 
                  type="password" 
                  id="cvv" 
                  value={cvv} 
                  onChange={(e) => setCvv(e.target.value)} 
                  maxLength="3" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="captcha">Captcha: {generatedCaptcha}</label>
                <input 
                  type="text" 
                  id="captcha" 
                  value={captcha} 
                  onChange={(e) => setCaptcha(e.target.value)} 
                  required 
                />
                {captchaError && <span className="error-message">{captchaError}</span>}
              </div>

              <h3>Total Amount: {amount} {'\u20B9'}</h3>
              <button type="submit" className="payment-button" disabled={formSubmitted}>Submit Payment</button>
            </form>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default Subscribe;
