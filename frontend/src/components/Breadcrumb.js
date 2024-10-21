import React from 'react';
import './Breadcrumb.css'; // Make sure to create a CSS file for styling
import Image from './/breadcrumb-bg.jpg'; // Import the image correctly

const Breadcrumb = ({ title, links }) => {
    return (
        <section
            className="breadcrumb-section set-bg"
            style={{ backgroundImage: `url(${Image})` }} // Use template literals for the URL
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="breadcrumb-text">
                            <h1>{title}</h1>
                            <div className="bt-option">
                                {links.map((link, index) => (
                                    <span key={index}>
                                        <a href={link.href}>{link.text}</a>
                                        {index < links.length - 1 && <span> / </span>}
                                    </span>
                                ))}
                                <span> / {title}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Breadcrumb;
