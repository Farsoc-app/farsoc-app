import React, { useState } from 'react';
import './FarmerDetail.css';
import AgreementForm from './AgreementForm';
import { useParams, useNavigate } from 'react-router-dom';

function StarRating({ rating }) {
    const totalStars = 5;
    let stars = [];
    for (let i = 1; i <= totalStars; i++) {
        stars.push(
            <span key={i} className={i <= rating ? "star-filled" : "star-empty"}>
                ★
            </span>
        );
    }
    return <div className="star-rating">{stars}</div>;
}


function FarmerDetail({ farmers }) {
    const navigate = useNavigate();
    const { farmerId } = useParams();    
    const farmer = farmers.find(f => f.id == farmerId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="farmer-detail-page">

            <button className="floating-back-btn" onClick={() => navigate(-1)}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>


            {/* Photo Placeholder */}
            <div className="photo-placeholder">
                <span>No images uploaded yet.</span>
            </div>

            {/* Farmer Info */}
            <div className="info-section">
                <div className="info-header">
                    <div className="farmer-icon-large">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M480 576q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160 896v-80q0-54 26-97t70-65q106-53 224-53s224 20 224 53q44 22 70 65t26 97v80H160Z" /></svg>
                    </div>
                    <div className="info-text">
                        <h2>{farmer.name}</h2>
                        <p className="location">{farmer.location}</p>
                    </div>
                </div>
                <div className="tag-container">
                    <span className="rating-tag">★ {farmer.rating}</span>
                    <span className="farming-type-tag">{farmer.farmingType}</span>
                </div>
            </div>

            {/* Action Buttons (Non-clickable) */}
            <div className="action-buttons">
                <div className="action-btn call-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#d32f2f">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    <span>Call</span>
                </div>
                <div className="action-btn text-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                    </svg>
                    <span>Text</span>
                </div>
            </div>

            {/* About Section */}
            <div className="detail-section">
                <h3>About the Farmer</h3>
                <div className="detail-section-card">
                    <p>
                        Detailed information about the farmer, their history, their team,
                        and their farming practices will be displayed here.
                    </p>
                </div>
            </div>

            {/* Supply Agreement Details */}
            <div className="detail-section">
                <h3>Supply Agreement Details</h3>
                <div className="detail-section-card">
                    <div className="details-list">
                        <div className="detail-item">
                            <span>Minimum Contract Duration:</span>
                            <p>{farmer.agreementDetails.minDuration}</p>
                        </div>
                        <div className="detail-item">
                            <span>Supply Frequency:</span>
                            <p>{farmer.agreementDetails.frequency}</p>
                        </div>
                        <div className="detail-item">
                            <span>Emergency Supply:</span>
                            <p>{farmer.agreementDetails.emergency}</p>
                        </div>
                        <div className="detail-item">
                            <span>Payment Terms:</span>
                            <p>{farmer.agreementDetails.payment}</p>
                        </div>
                        <div className="detail-item">
                            <span>Quality Guarantee:</span>
                            <p>{farmer.agreementDetails.quality}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* What We Produce Section */}
            <div className="detail-section">
                <h3>What We Produce</h3>
                <div className="detail-section-card">
                    {/* Get the category names (like 'vegetables') from the produce object and loop over them */}
                    {Object.keys(farmer.produce).map((category) => (
                        <div key={category} className="produce-category">
                            <h4>{category}</h4>
                            <div className="produce-grid">
                                {/* Loop over the items within that specific category */}
                                {farmer.produce[category].map((item) => (
                                    <div key={item.name} className="produce-item">
                                        <span className="produce-name">{item.name}</span>
                                        <span className="produce-price">
                                            ₹{item.price} / {item.unit || 'kg'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ======================= REVIEWS SECTION ======================= */}
            <div className="detail-section">
                <h3>Reviews from Societies</h3>
                <div className="detail-section-card">
                    <div className="reviews-list">
                        {farmer.reviews && farmer.reviews.length > 0 ? (
                            farmer.reviews.map(review => (
                                <div key={review.id} className="review-card">
                                    <div className="review-header">
                                        <span className="society-name">{review.societyName}</span>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                    <span className="review-date">{review.date}</span>
                                </div>
                            ))
                        ) : (
                            <p className="no-reviews-message">No reviews have been added yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Find this button and ADD the onClick part */}
            <div className="propose-agreement-section">
                <button className="propose-btn" onClick={() => navigate(`/farmers/${farmer.id}/agreement`)}>
                    Propose Supply Agreement
                </button>
            </div>

            {/* ADD THIS ENTIRE MODAL BLOCK AT THE END */}
            {isModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <AgreementForm farmer={farmer} />
                        <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FarmerDetail;