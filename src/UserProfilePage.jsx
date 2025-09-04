import React, { useState, useEffect } from 'react';
import { account } from './appwrite';
import './UserProfilePage.css';
import { useNavigate } from 'react-router-dom';

function UserProfilePage() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await account.get();
                setUserData(user);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
    }

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            navigate('/login');
            window.location.reload();
        } catch (error) {
            console.error("Failed to log out:", error);
            alert(error.message);
        }
    };

    return (
        <div className="profile-page-container">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Your Profile</h1>
                    <p>View and edit your account details below.</p>
                </div>

                <div className="user-details-form">
                    {userData && (
                        <>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={userData.name} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" value={userData.email} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="text" value={userData.phone} readOnly />
                            </div>
                        </>
                    )}
                </div>

                <div className="profile-actions">
                    <button
                        className="submit-button"
                        onClick={() => alert('Update logic will be added here!')}
                    >
                        Update Profile
                    </button>
                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;