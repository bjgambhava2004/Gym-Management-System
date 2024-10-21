import React from 'react';
import './Gallery.css'; // Import your CSS file
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Breadcrumb from '../Breadcrumb';

import gallery1 from './gallery-1.jpg';
import gallery3 from './gallery-3.jpg';
import gallery4 from './gallery-4.jpg';
import gallery5 from './gallery-5.jpg';
import gallery6 from './gallery-6.jpg';
import gallery7 from './gallery-7.jpg';


const Gallery = () => {
    const images = [
        gallery1,
        gallery3,
        gallery4,
        gallery5,
        gallery6,
        gallery7,
    ];

    const breadcrumbLinks = [
        { href: '/', text: 'Home' },
        { href: '#', text: 'Pages' },
    ];

    return (
        <>
            <Navbar />
            <Breadcrumb title="Gallery" links={breadcrumbLinks} />
            <div className="gallery-section gallery-page">
                <div className="gallery">
                    <div className="grid-sizer"></div>
                    {images.map((image, index) => (
                        <div
                            className={`gs-item ${index % 3 === 0 ? 'grid-wide' : ''} set-bg`}
                            key={index}
                            style={{ backgroundImage: `url(${image})` }}
                        >
                            <a href={image} className="thumb-icon image-popup">
                                <i className="fa fa-picture-o"></i>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Gallery;
