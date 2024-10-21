import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { validatePassword, login } from '../../Server'; // Adjust import path if necessary
import logo from '../../images/Signup_logo.png';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleSignup = async () => {
        // Validate form fields
        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage("Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Password and Confirm Password do not match.");
            return;
        }

        setErrorMessage("");
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/account/api/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Sign Up successful");

                // Automatically log in the user after successful signup
                const loginResponse = await login(email, password);
                if (loginResponse.message) {
                    // Store user details in local storage
                    localStorage.setItem('user_id', loginResponse.id);
                    localStorage.setItem('user_name', loginResponse.name);
                    navigate('/'); // Redirect to the dashboard or another route
                } else {
                    setErrorMessage("Login failed after signup.");
                }

                // Clear input fields
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                // Handle backend error response
                setErrorMessage(data.error || 'Failed to sign up. Please try again.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setErrorMessage('Failed to sign up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='row g-0 vh-100 justify-content-center align-items-center mt-2'>
                <div className='col-10 row g-0 align-items-center border rounded-2'>
                    <div className='col-6'>
                        <img src={logo} style={{height:'95%'}} alt="computer-logo" className='img-1' />
                    </div>
                    <form className='col-6 py-4 px-3'>
                    <button
                                className="close-btn"
                                onClick={() => navigate('/')}
                                aria-label="Close"
                            >
                                &times; {/* Cross mark */}
                            </button>
                        <h4 className='signup-title text-center py-2 mb-2'>Sign Up</h4>
                        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
                        <div className='form-floating mb-3'>
                            <input
                                type='text'
                                className='form-control'
                                id='username'
                                placeholder='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label htmlFor='username'>Username</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                placeholder='name@example.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor='password'>Password</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input
                                type='password'
                                className='form-control'
                                id='confirm-password'
                                placeholder='confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <label htmlFor='confirm-password'>Confirm Password</label>
                        </div>
                        <div className='text-center'>
                            <button
                                type='button'
                                className='signup-btn py-3 rounded-3'
                                onClick={handleSignup}
                                disabled={loading}
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>
                        <div className='text-center mt-3'>
                            Already Registered? <Link to='/login'>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
