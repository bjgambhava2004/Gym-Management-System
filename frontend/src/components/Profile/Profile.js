import React, { useState, useEffect } from 'react';
import './Profile.css';
import Navbar from '../Home/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faRulerCombined, faWeight, faUserMd, faClipboardList, faCalendarCheck, faCalendarTimes ,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Profileedit from './Profileedit';
import Footer from '../Home/Footer';
import img from './default.jpeg';
import Image from './/breadcrumb-bg.jpg'; // Import the image correctly
import Breadcrumb from '../Breadcrumb';

const Profile = () => {
  const [user, setUser] = useState({});
  const [selectedSection, setSelectedSection] = useState('accountInfo');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const userId = localStorage.getItem('user_id');
  const breadcrumbLinks = [
    { href: '/', text: 'Home' },
  ];
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8000/account/api/user-profile/${userId}/`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error('Fetch error:', error);
          setError('Failed to load user data. Please try again.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No userId found in localStorage');
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:8000/account/api/delete-account/${userId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId })
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      alert('Account deleted successfully');
      localStorage.clear();
      window.location.href = '/'; // Redirect to home page or login page
    } catch (error) {
      alert('Failed to delete account: ' + error.message);
    }
  };

  const renderSection = () => {
    switch (selectedSection) {
        case 'accountInfo':
            return (
              <div className="profiledetails-print-content">
                <h2>Account Information</h2>
                <p><FontAwesomeIcon icon={faUser} /> <b>Name:</b> {user.name || '-'}</p>
                <p><FontAwesomeIcon icon={faEnvelope} /> <b>Email:</b> {user.email || '-'}</p>
                <p><FontAwesomeIcon icon={faPhone} /> <b>Phone:</b> {user.mobile_number || '-'}</p>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <b>Address:</b> {user.address || '-'}</p>
                <p><FontAwesomeIcon icon={faRulerCombined} /> <b>Height:</b> { user.height ? `${user.height} cm` : '-'}</p>
                <p><FontAwesomeIcon icon={faWeight} /> <b>Weight:</b> {user.weight ? `${user.weight} kg` : '-'}</p>
                <p><FontAwesomeIcon icon={faClipboardList} /> <b>Plan Name:</b> {user.plan_name || '-'}</p>
                <p><FontAwesomeIcon icon={faCalendarCheck} /> <b>Plan Start Date:</b> {user.plan_start_date || '-'}</p>
                <p><FontAwesomeIcon icon={faCalendarTimes} /> <b>Plan End Date:</b> {user.plan_end_date || '-'}</p>
                <p><FontAwesomeIcon icon={faUserMd} /> <b>BMI:</b> {user.bmi || '-'}</p>
                <p>
                  <FontAwesomeIcon icon={faFacebook} /> <b>Facebook:</b>
                  <a href={user.facebook_link || '#'}>{user.facebook_link || 'Not provided'}</a>
                </p>
                <p>
                  <FontAwesomeIcon icon={faLinkedin} /> <b>LinkedIn:</b>
                  <a href={user.linkedin_link || '#'}>{user.linkedin_link || 'Not provided'}</a>
                </p>
              </div>
        );
      case 'editProfile':
        return <Profileedit />;
      case 'closeAccount':
        return (
          <div className="profiledetails-print-content">
            <button onClick={() => setShowConfirmDialog(true)}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Close Account
            </button>
            {showConfirmDialog && (
              <div className="confirm-dialog">
                <p>Are you sure you want to delete your account?</p>
                <button onClick={handleDeleteAccount}>Yes</button>
                < button onClick={() => setShowConfirmDialog(false)}>No</button>
              </div>
            )}
          </div>
        );
      default:
        return <div className="profiledetails-print-content">Select an option</div>;
    }
  };

  if (loading) {
    return <div className="profiledetails-print-loading">Loading...</div>;
  }

  if (error) {
    return <div className="profiledetails-print-error">Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      {/* <Breadcrumb title={user.name} links={breadcrumbLinks} /> */}

      <section
            className="breadcrumb-section set-bg"
            style={{ backgroundImage: `url(${Image})` }} // Use template literals for the URL
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="breadcrumb-text">
                          <img className="profiledetails-print-profile-pic"
                            src={user.profile_image ? `http://127.0.0.1:8000/${user.profile_image}` : img}
                            alt="Profile"/>
                          <h1 className='profiledetails-print-header-title'>{user.name || 'Name not provided'}</h1>
                          <p className='profiledetails-print-info'>
                          <span><FontAwesomeIcon icon={faPhone} /> {user.mobile_number || '-'}</span>
                          <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {user.address || '-'}</span>
                          <span><FontAwesomeIcon icon={faEnvelope} /> {user.email || '-'}</span>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      < div className="profiledetails-print-main-content" style={{ display: 'flex' }}>
        <div className="profiledetails-print-sidebar">
          <button onClick={() => setSelectedSection('accountInfo')}>Account Info</button>
          <button onClick={() => setSelectedSection('editProfile')}>Edit Profile</button>
          <button onClick={() => setSelectedSection('closeAccount')}>Close Account</button>
        </div>
        <div className="profiledetails-print-details" style={{ flex: 1 }}>
          {renderSection()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
