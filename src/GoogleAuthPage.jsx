import React from 'react';
import { useLocation } from 'react-router-dom'; // <-- ADD THIS IMPORT
import { account } from './appwrite';
import './GoogleAuthPage.css';

// SVG component for the Google Icon (no changes here)
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.21C30.222,35.286,27.325,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.21C40.096,35.021,44,29.875,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

function GoogleAuthPage() {
    // ---- START OF NEW LOGIC ----
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const role = params.get('role'); // This will be 'farmer', 'buyer', or null

    let subtitle = "Please continue to get started."; // Default text
    if (role === 'farmer') {
        subtitle = "Please continue to connect with societies.";
    } else if (role === 'buyer') {
        subtitle = "Please continue to connect with farmers.";
    }
    // ---- END OF NEW LOGIC ----

    const handleGoogleLogin = () => {
        try {
            account.createOAuth2Session(
                'google',
                'https://farsoc.netlify.app/home',
                'https://farsoc.netlify.app/auth'
            );
        } catch (error) {
            console.error("Failed to initiate Google login", error);
            alert("An error occurred. Could not start Google login.");
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-box">
                <h1 className="auth-title">Welcome to Farsoc</h1>
                {/* USE THE NEW SUBTITLE VARIABLE HERE */}
                <p className="auth-subtitle">{subtitle}</p>
                <button onClick={handleGoogleLogin} className="google-auth-button">
                    <GoogleIcon />
                    <span>Continue with Google</span>
                </button>
                <p className="auth-terms">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
}

export default GoogleAuthPage;