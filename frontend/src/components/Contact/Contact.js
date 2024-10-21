import React from 'react';
import './Contact.css'; // Create a CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMobileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Breadcrumb from '../Breadcrumb';

const ContactSection = () => {
    const breadcrumbLinks = [
        { href: '/', text: 'Home' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            comment: e.target.comment.value,
        };
    
        fetch(`http://localhost:8000/account/api/submit-contact/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Success message
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    return (
        <>
        <Navbar/>
        <Breadcrumb title="Contact" links={breadcrumbLinks} />
        <section className="contact-section spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-title contact-title">
                            <span>Contact Us</span>
                            <h2>GET IN TOUCH</h2>
                        </div>
                        <div className="contact-widget">
                            <div className="cw-text">
                                <h1><FontAwesomeIcon icon={faMapMarkerAlt} /></h1>
                                
                                <h4>333 Middle Winchendon Rd, Rindge,<br /> NH 03461</h4>
                            </div>
                            <div className="cw-text">
                                <h1><FontAwesomeIcon icon={faMobileAlt} /></h1>
                                <h4>
                                125-711-811
                                </h4>
                                
                            </div>
                            <div className="cw-text email">
                                <h1><FontAwesomeIcon icon={faEnvelope} /></h1>
                                <h4><p>Support.gymcenter@gmail.com</p></h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="leave-comment" style={{marginTop:"60px"}}>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="name" placeholder="Name" required />
                            <input type="email" name="email" placeholder="Email" required />
                            <textarea name="comment" placeholder="Comment" required></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    </div>
                </div>
                <div className="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.2195226868826!2d72.56465941499326!3d23.03636078456118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84c6d2b6e81f%3A0x13fc9c51c8b45b1b!2sArya%2C%20Ahmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1632170962944!5m2!1sen!2sus"
                    height="550"
                    width="1300px"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>

                </div>
            </div>
        </section>
        <Footer/>
        </>
    );
};

export default ContactSection;
