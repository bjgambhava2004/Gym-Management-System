import React from 'react';
import './404.css'; // Make sure to create this CSS file
import video from './404video.mp4';

const Page404 = () => {
  return (
    <div className="error-page">
      <div className="video-container">
        <video autoPlay loop muted className="error-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="error-content">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <a href="/" className="home-button">Go Back to Home</a>
      </div>
    </div>
  );
};

export default Page404;
