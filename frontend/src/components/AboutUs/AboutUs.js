import React from 'react';
import Navbar from '../Home/Navbar'; // Assuming you have a Navbar component
import Footer from '../Home/Footer'; // Assuming you have a Footer component
import Breadcrumb from '../Breadcrumb'; // Assuming you have a Breadcrumb component
import gymImage from './gallery-3.jpg'; // Import an image related to the gym
import './AboutUs.css'; // Import custom CSS

const AboutUs = () => {
    const breadcrumbLinks = [
        { href: '/', text: 'Home' },
        { href: '#', text: 'About Us' },
    ];

    return (
        <>
            <Navbar />
            <Breadcrumb title="About Us" links={breadcrumbLinks} />
            <div className="aboutus-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2>Welcome to Our Gym</h2>
                            <p>
                                At <strong>Arya Fitness Center</strong>, we are dedicated to helping
                                you achieve your fitness goals, whether you’re looking to lose weight,
                                build muscle, improve endurance, or simply maintain a healthy lifestyle.
                            </p>
                            <p>
                                Our state-of-the-art facility features the latest equipment, diverse classes,
                                and a team of expert trainers to guide you every step of the way. We believe in
                                fostering a supportive and motivating community to help you push beyond your limits.
                            </p>
                            <p>
                                We offer personalized workout plans, nutrition guidance, and a variety of classes like
                                yoga, Zumba, strength training, and more to suit every fitness level.
                            </p>
                            <p>
                                Whether you are a seasoned athlete or just starting your fitness journey, we are here to
                                support you in every aspect of your health and wellness. Join us today and take the first
                                step towards a healthier, fitter you.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div className="aboutus-image">
                                <img src={gymImage} alt="Gym Facility" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
