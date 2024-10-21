import React from 'react';
import './css/Pricing.css';
import 'font-awesome/css/font-awesome.min.css';
const Pricing = () => {
  return (
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
              <h3>1 Month Plain</h3>
              <div className="pi-price">
                <h2>1000 {'\u20B9'}</h2>
                <span>SINGLE CLASS</span>
              </div>
              <ul>
                <li>Free riding</li>
                <li>Unlimited equipments</li>
                <li>Personal trainer</li>
                <li>Weight losing classes</li>
                <li>Month to mouth</li>
                <li>No time restriction</li>
              </ul>
              <a href="/subscribe" className="primary-btn pricing-btn">Enroll now </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-8">
            <div className="ps-item">
              <h3>12 Month unlimited</h3>
              <div className="pi-price">
                <h2>10000 {'\u20B9'}</h2>
                <span>SINGLE CLASS</span>
              </div>
              <ul>
                <li>Free riding</li>
                <li>Unlimited equipments</li>
                <li>Personal trainer</li>
                <li>Weight losing classes</li>
                <li>Month to mouth</li>
                <li>No time restriction</li>
              </ul>
              <a href="/subscribe" className="primary-btn pricing-btn">Enroll now </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-8">
            <div className="ps-item">
              <h3>6 Month unlimited</h3>
              <div className="pi-price">
                <h2>5000 {'\u20B9'}</h2>
                <span>SINGLE CLASS</span>
              </div>
              <ul>
                <li>Free riding</li>
                <li>Unlimited equipments</li>
                <li>Personal trainer</li>
                <li>Weight losing classes</li>
                <li>Month to mouth</li>
                <li>No time restriction</li>
              </ul>
              <a href="/subscribe" className="primary-btn pricing-btn">Enroll now </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
