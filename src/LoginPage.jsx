import './LoginPage.css';
import React, { useState } from 'react';
import { account } from './appwrite';
import { Link, useNavigate } from 'react-router-dom';


function LoginPage({ setCurrentPage }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("Attempting to log in...");
            await account.createEmailPasswordSession(formData.email, formData.password);
            console.log("Login successful!");

            navigate('/farmers');
            window.location.reload();
        } catch (error) {
            console.error("Login failed with error:", error);
            alert("Login Failed: " + error.message); 
        }
    };

    return (
        <div className="login-page-container">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Welcome back!</h1>
                    <p>Sign in to access your dashboard.</p>
                </div>

                <form className="profile-form" onSubmit={handleSubmit}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="submit-button">Log In</button>
                </form>

                <p className="auth-switch-text">
                    Need an account?{' '}
                    {/* This will switch to the signup page */}
                    <Link to="/signup" className="auth-switch-link">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;