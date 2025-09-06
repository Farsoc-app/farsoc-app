import React from 'react';
import { Link } from 'react-router-dom';
import './FarmerSignupPage.css'; 

function FarmerSignupPage() {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // We will add the Appwrite logic here later
        alert('Form submitted! (Backend not connected yet)');
    };

    return (
        <div className="form-page-container">
            <div className="form-card">
                <div className="form-header">
                    <h1>Farmer Registration</h1>
                    <p>Create your farmer profile to start selling.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <div className="form-group">
                            <label htmlFor="farmName">Farm / Group Name *</label>
                            <input type="text" id="farmName" name="farmName" required />
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="input-grid">
                            <div className="form-group">
                                <label htmlFor="contactName">Contact Person Name *</label>
                                <input type="text" id="contactName" name="contactName" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input type="tel" id="phone" name="phone" required />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="input-grid">
                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password *</label>
                                <input type="password" id="password" name="password" required />
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" className="submit-btn">Create Farmer Account</button>
                </form>

                <div className="auth-switch-text">
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </div>
            </div>
        </div>
    );
}

export default FarmerSignupPage;