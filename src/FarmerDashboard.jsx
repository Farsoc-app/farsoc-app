import React from 'react';
import { Link } from 'react-router-dom';
import './FarmerDashboard.css';

function FarmerDashboard() {
    // We are using hardcoded data for now.
    // Later, we will fetch this from Appwrite.
    const farmerName = "A farmer";
    const activeAgreements = 2;
    const agreementRequests = 1;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <Link to="/profile" className="profile-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" fill="#333">
                        <path d="M480 576q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160 896v-80q0-54 26-97t70-65q106-53 224-53s224 20 224 53q44 22 70 65t26 97v80H160Z" />
                    </svg>
                </Link>
            </header>

            <p className="welcome-message">Welcome back, {farmerName}</p>

            <div className="info-card-grid">
                <div className="info-card agreements">
                    <span className="card-title">Active Agreements</span>
                    <span className="card-value">{activeAgreements}</span>
                    <span className="card-subtitle">Ongoing contracts</span>
                </div>
                <div className="info-card requests">
                    <span className="card-title">Agreement Requests</span>
                    <span className="card-value">{agreementRequests}</span>
                    <span className="card-subtitle">New requests</span>
                </div>
            </div>

            <div className="quick-actions-section">
                <h2>Quick Actions</h2>
                <div className="quick-actions-grid">
                    <Link to="/team" className="action-card">
                        <span>👥</span>
                        <span>Team Members</span>
                    </Link>
                    <Link to="/farm-details" className="action-card">
                        <span>🌾</span>
                        <span>Agreement Details</span>
                    </Link>
                    <Link to="/reviews" className="action-card">
                        <span>⭐</span>
                        <span>Reviews</span>
                    </Link>
                    <Link to="/all-agreements" className="action-card">
                        <span>📝</span>
                        <span>All Agreements</span>
                    </Link>
                    <Link to="/inquiries" className="action-card">
                        <span>💬</span>
                        <span>Inquiries</span>
                    </Link>
                    <Link to="/finances" className="action-card">
                        <span>₹</span>
                        <span>My Finances</span>
                    </Link>
                </div>
            </div>

            <Link to="/manage-produce" className="produce-card">
                <div className="produce-card-text">
                    <h3>Manage My Produce List</h3>
                    <p>Update prices, stock status, and add new items</p>
                </div>
                <span className="produce-card-arrow">&rarr;</span>
            </Link>

            {/* Weekly Earnings Chart */}
            <div className="earnings-card">
                <h3>Weekly Earnings</h3>
                <div className="chart-area">
                    {/* We will map over some data to create the bars */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                        // Placeholder earnings data
                        const earnings = [60, 80, 100, 85, 110, 50, 30];
                        const maxEarning = 120;
                        const barHeight = (earnings[index] / maxEarning) * 100;

                        return (
                            <div key={day} className="day-container">
                                <div className="bar" style={{ height: `${barHeight}%` }}></div>
                                <span className="day-label">{day}</span>
                            </div>
                        );
                    })}
                </div>
                <p className="total-earnings">Total: ₹xxxxx</p>
            </div>
        </div>
    );
}

export default FarmerDashboard;