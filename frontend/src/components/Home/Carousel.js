import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import img1 from './Carosal1.jpg'; // Make sure this path is correct
import img2 from './Carosal2.jpg'; // Make sure this path is correct
import img3 from './Carosal3.jpg'; // Make sure this path is correct
import './css/Carousel.css'; // Import the CSS file where you put the custom styles

const Carousel = () => {
  const imgStyle = {
    width: '100%',
    height: '500px', // Set your desired height here
    objectFit: 'cover', // Ensures the image covers the area without distortion
  };


  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      {/* Indicators/dots */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      
      {/* The slideshow/carousel */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img2} style={imgStyle} alt="Los Angeles" />
          
        </div>
        <div className="carousel-item">
          <img src={img1} style={imgStyle} alt="Chicago" />
          
        </div>
        <div className="carousel-item">
          <img src={img3} style={imgStyle} alt="New York" />
          
        </div>
      </div>
    </div>
  );
};

export default Carousel;
