import React from 'react';
import './css/ChoseUs.css'
const ChoseUs = () => {
  return (
    <section className="choseus-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Why choose us?</span>
              <h2>PUSH YOUR LIMITS FORWARD</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="cs-item">
              <span className="flaticon-034-stationary-bike"></span>
              <h4>Modern equipment</h4>
              <p>Experience cutting-edge gym equipment for superior workouts and optimal results.</p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="cs-item">
              <span className="flaticon-033-juice"></span>
              <h4>Healthy nutrition plan</h4>
              <p>Follow a balanced nutrition plan tailored to your fitness goals for optimal health and performance.</p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="cs-item">
              <span className="flaticon-002-dumbell"></span>
              <h4>Professional training plan</h4>
              <p>Implement a personalized training plan designed by certified trainers to achieve specific fitness objectives efficiently.</p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="cs-item">
              <span className="flaticon-014-heart-beat"></span>
              <h4>Unique to your needs</h4>
              <p>Tailored programs that cater specifically to your individual fitness goals, preferences, and lifestyle.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChoseUs;
