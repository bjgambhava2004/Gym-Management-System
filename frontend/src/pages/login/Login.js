import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Server';
import OIP from '../../images/Login_img.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage("Email and Password are required.");
            return;
        }
    
        setErrorMessage('');
        try {
            const data = await login(email, password);
            if (data.message) {
                alert(data.message);
                localStorage.setItem('user_id', data.id);
                localStorage.setItem('user_name', data.name);
                navigate('/'); // Navigate to a different route after login
            } else {
                setErrorMessage("Invalid email or password.");
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setErrorMessage('Failed to log in. Please try again.');
        }
    };

    return (
        <>
            <div className='row g-0 vh-100 justify-content-center align-items-center mt-2'>
                <div className='col-10 row g-0 align-items-center border rounded-2'>
                    <div className='col-6'>
                        <img src={OIP} alt="computer-logo" className='img-1' />
                    </div>

                    <div className='col-6 py-4 px-3'>
                        <div className="position-relative">
                            <button
                                className="close-btn"
                                onClick={() => navigate('/')}
                                aria-label="Close"
                            >
                                &times; {/* Cross mark */}
                            </button>
                            <form>
                                <h4 className='login-title text-center py-2 mb-2'>Login</h4>
                                {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
                                <div className='form-floating mb-3'>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='email'
                                        placeholder='name@example.com'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor='email'>Email</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='password'
                                        placeholder='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor='password'>Password</label>
                                </div>
                                <div className='text-center'>
                                    <button
                                        type='button'
                                        className='login-btn py-3 rounded-3'
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                </div>
                                <div className='text-center mt-3'>
                                    Not Registered? <Link to='/signup'>Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
