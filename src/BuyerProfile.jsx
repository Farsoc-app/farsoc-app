import React, { useState } from 'react';
import './BuyerProfile.css';

function BuyerProfile({ setCurrentPage }) {
    // State to hold the form data
    const [formData, setFormData] = useState({
        societyName: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
    });

    // Function to handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Profile Saved:', formData);
        alert('Profile saved successfully! (Check the console)');
        setCurrentPage('farmerList'); 
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <button onClick={() => setCurrentPage('welcome')} className="back-button">
                    &larr;
                </button>
                <h1>Buyer Profile</h1>
                <p>Please complete your details to connect with farmers.</p>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="societyName"
                    placeholder="Society / Organization Name"
                    value={formData.societyName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="contactName"
                    placeholder="Contact Person Name"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="address"
                    placeholder="Full Delivery Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                ></textarea>
                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
}

export default BuyerProfile;