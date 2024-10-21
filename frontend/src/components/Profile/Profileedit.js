import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Profileedit.css';
import img1 from './1.png';
import img2 from './3.png';
import img3 from './4.png';

const Profileedit = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:8000/account/api/user-profile/${userId}/`);
          if (!response.ok) throw new Error(`Error: ${response.statusText}`);
          const data = await response.json();
          setUser(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No userId found');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const calculateBMI = (height, weight) => {
    if (height && weight) {
      return (weight / ((height / 100) ** 2)).toFixed(2); // BMI formula
    }
    return '';
  };

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    const errors = {};

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append('name', user.name || '');
    formData.append('address', user.address || '');
    formData.append('mobile_number', user.mobile_number || '');
    formData.append('email', user.email || '');
    formData.append('height', user.height || '');
    formData.append('weight', user.weight || '');
    formData.append('bmi', calculateBMI(user.height, user.weight) || '');
    formData.append('linkedin_link', user.linkedin_link || '');
    formData.append('facebook_link', user.facebook_link || '');

    if (profileImage) formData.append('profile_image', profileImage);

    try {
      const response = await fetch(`http://localhost:8000/account/api/user-profile-update/${userId}/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditing(false);
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setProfileImage(file);
      setFormErrors(prev => ({ ...prev, profile_image: null }));
    } else {
      setFormErrors(prev => ({ ...prev, profile_image: 'Profile picture must be JPG, PNG, or JPEG format' }));
    }
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setUser({ ...user, [field]: value });

    if (field === 'height' || field === 'weight') {
      const newHeight = field === 'height' ? value : user.height;
      const newWeight = field === 'weight' ? value : user.weight;
      setUser(prev => ({
        ...prev,
        bmi: calculateBMI(newHeight, newWeight),
      }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`profile-edit-home-tab-content ${editing ? 'profile-edit-home-editing' : ''}`}>
      <h1 className="profile-edit-home-h1">Profile</h1>
      <div className="profile-edit-home-tab-pane profile-edit-home-fade profile-edit-home-in profile-edit-home-show profile-edit-home-active profile-edit-home-account-info">
        <div className="profile-edit-home-section profile-edit-home-display-information">
          <div className="profile-edit-home-change-photo">
            <div className="profile-edit-home-user-image">
              <img
                src={user.profile_image ? `http://127.0.0.1:8000/${user.profile_image}` : img1}
                alt="User"
                className="img-fluid"
              />
            </div>
            <div className={`profile-edit-home-upload-photo ${editing ? '' : 'profile-edit-home-editing-only'}`}>
              <label className="profile-edit-home-btn profile-edit-home-btn-primary" htmlFor="upload-profile-image">
                <input
                  type="file"
                  id="upload-profile-image"
                  onChange={handleProfileImageChange}
                />
                Change Photo
              </label>
              <span className="profile-edit-home-max-size">Max 20 MB</span>
              {formErrors.profile_image && <p className="error">{formErrors.profile_image}</p>}
            </div>
            <div className="profile-edit-home-button-container">
              {editing ? (
                <button className="profile-edit-home-btn profile-edit-home-btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              ) : (
                <button className="profile-edit-home-btn profile-edit-home-btn-secondary" onClick={handleEdit}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <ul className="profile-edit-home-account-details">
            <li>
              Display Name
              <span>
                {editing ? (
                  <input
                    type="text"
                    value={user.name || ''}
                    onChange={(e) => handleChange(e, 'name')}
                  />
                ) : (
                  user.name || 'N/A'
                )}
              </span>
            </li>
            <li>
              Address
              <span>
                {editing ? (
                  <input
                    type="text"
                    value={user.address || ''}
                    onChange={(e) => handleChange(e, 'address')}
                  />
                ) : (
                  user.address || 'N/A'
                )}
              </span>
            </li>
            <li>
              Phone Number
              <span>
                {editing ? (
                  <>
                    <input
                      type="text"
                      value={user.mobile_number || ''}
                      onChange={(e) => handleChange(e, 'mobile_number')}
                    />
                    {formErrors.mobile_number && <p className="error">{formErrors.mobile_number}</p>}
                  </>
                ) : (
                  user.mobile_number || 'N/A'
                )}
              </span>
            </li>
            <li>
              Email Id
              <span>
                {editing ? (
                  <input
                    type="email"
                    value={user.email || ''}
                    onChange={(e) => handleChange(e, 'email')}
                  />
                ) : (
                  user.email || 'N/A'
                )}
              </span>
            </li>
            <li>
              Height (cm)
              <span>
                {editing ? (
                  <input
                    type="number"
                    value={user.height || ''}
                    onChange={(e) => handleChange(e, 'height')}
                  />
                ) : (
                  user.height || 'N/A'
                )}
              </span>
            </li>
            <li>
              Weight (kg)
              <span>
                {editing ? (
                  <input
                    type="number"
                    value={user.weight || ''}
                    onChange={(e) => handleChange(e, 'weight')}
                  />
                ) : (
                  user.weight || 'N/A'
                )}
              </span>
            </li>
            <li>
              BMI
              <span>{user.bmi || 'N/A'}</span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className={`profile-edit-home-section ${editing ? 'profile-edit-home-editing-only' : ''}`}>
          <div className="profile-edit-home-title">
            <div className="profile-edit-home-icon">
              <img src={img3} alt="Icon" className="img-fluid" />
            </div>
            <span>Social Links</span>
          </div>
          <div className="profile-edit-home-social-links">
            <ul>
              <li>
                <FontAwesomeIcon icon={faFacebook} />
                <span style={{ marginLeft: '10px', marginRight: '10px' }}>Facebook: </span>
                <span>
                  {editing ? (
                    <input
                      type="text"
                      value={user.facebook_link || ''}
                      onChange={(e) => handleChange(e, 'facebook_link')}
                    />
                  ) : (
                    <a href={user.facebook_link || '#'} target="_blank" rel="noopener noreferrer">
                      {user.facebook_link}
                    </a>
                  )}
                </span>
              </li>
              <li>
                <FontAwesomeIcon icon={faLinkedin} />
                <span style={{ marginLeft: '10px', marginRight: '10px' }}> LinkedIn: </span>
                <span>
                  {editing ? (
                    <input
                      type="text"
                      value={user.linkedin_link || ''}
                      onChange={(e) => handleChange(e, 'linkedin_link')}
                    />
                  ) : (
                    <a href={user.linkedin_link || '#'} target="_blank" rel="noopener noreferrer">
                      {user.linkedin_link}
                    </a>
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profileedit;
