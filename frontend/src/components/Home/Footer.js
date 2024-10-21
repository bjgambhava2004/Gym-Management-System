import React from 'react';
import './css/Footer.css';
import logo from '../../images/Footer/logo.png';

function Footer() {
  return (
    <section className="footer-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="fs-about">
              <div className="fa-logo">
                <a href="/"><img src={logo} alt="Logo" /></a>
              </div>
              <p>
              At Gym , we believe in fostering a healthy lifestyle through fitness and community.
               Our state-of-the-art facility offers a wide range of equipment, classes, and personal 
               training services tailored to meet the needs of every member.
              </p>
              <div className="fa-social">
                <a href="/"><i className="fa fa-facebook"></i></a>
                <a href="/"><i className="fa fa-twitter"></i></a>
                <a href="/"><i className="fa fa-youtube-play"></i></a>
                <a href="/"><i className="fa fa-instagram"></i></a>
                <a href="/"><i className="fa fa-envelope-o"></i></a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="fs-widget" style={{marginLeft:'450px', width:'150px'}}>
              <h4>Useful Links</h4>
              <ul>
                <li><a href="/AboutUs">About</a></li>
                <li><a href="/Exercise">Exercise</a></li>
                <li><a href="/BMICalculator">BMI Calculator</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="fs-widget" style={{marginLeft:'500px'}}>
              <h4>Support</h4>
              <ul>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Sign Up</a></li>
                <li><a href="/subscribe">Subscribe</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="copyright-text">
              <p>
                Copyright &copy;{new Date().getFullYear()} All rights reserved | This
                template is made <i className="fa fa-heart" aria-hidden="true"></i> by
                <a href="https://in.linkedin.com/in/bhavya-gambhava-2332b9270" target="_blank" rel="noopener noreferrer"> Bhavya Gambhava</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
