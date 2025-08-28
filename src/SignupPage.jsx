import { Link, useNavigate } from 'react-router-dom';
import { account } from './appwrite.js';
import { ID } from 'appwrite';
import React, { useState } from 'react';
import './SignupPage.css';

function SignupPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        contactName: "",
        email: "",
        password: "",
        phone: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await account.create(
                ID.unique(),
                formData.email,
                formData.password,
                formData.contactName
            );

            await account.createEmailPasswordSession(formData.email, formData.password);
            const formattedPhone = `+91${formData.phone}`;
            await account.updatePhone(formattedPhone, formData.password);

            sessionStorage.setItem('showProfilePrompt', 'true');
            alert('Account created successfully! Welcome to Farsoc.');
            navigate('/farmers');
            window.location.reload();

        } catch (error) {
            console.error('Signup failed:', error);
            alert(`Signup failed: ${error.message}`);

            console.log('Starting cleanup attempt...');
            try {
                const user = await account.get();
                console.log('Found partially created user to clean up:', user.$id);
                await account.delete();
                console.log('Cleanup successful: User account deleted.');
            } catch (cleanupError) {
                console.error('CLEANUP FAILED:', cleanupError);
                alert('A partial user might have been created. Please contact support.');
            }
        }
    };

    return (
        <div className="signup-page-container">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Buyer Profile</h1>
                    <p>Please complete your details to connect with farmers.</p>
                </div>

                <form className="profile-form" onSubmit={handleSubmit}>
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
                        type="password"
                        name="password"
                        placeholder="Create a Password"
                        value={formData.password}
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

                    <p className="legal-text">
                        By clicking “Create Account”, you agree to Farsoc's{' '}
                        <span className="legal-link">Terms of Service</span> and have read the{' '}
                        <span className="legal-link">Privacy Policy</span>.
                    </p>
                    <button type="submit" className="submit-button">Create Account</button>
                </form>
                <p className="auth-switch-text">
                    Already have an account?{' '}
                    <Link to="/login" className="auth-switch-link">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;