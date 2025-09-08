import { useParams, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'; 
import './AgreementForm.css';

function AgreementForm({ farmers }) { 
    const { farmerId } = useParams();
    const navigate = useNavigate(); 
    const [selectedDuration, setSelectedDuration] = useState(null);

    const farmer = farmers.find(f => f.id == farmerId);

    const societyInfo = {
        name: "Green Valley Society",
        deliveryLocation: "Guwahati, Assam",
    };

    if (!farmer) {
        return <div>Loading farmer details...</div>;
    }

    return (
        <div className="agreement-page">
            <div className="agreement-form-container">

                <div className="agreement-form">
                    <div className="form-section">
                        <h3 className="form-section-title">Agreement with {farmer?.name}</h3>
                        <p className="farmer-location-subtitle">{farmer.location}</p>
                    </div>

                    <div className="form-section">
                        <h3 className="form-section-title">Society Information</h3>

                        <div className="input-grid">  

                            <div className="form-group"> 
                                <label>Society Name *</label>
                                <input
                                    name="societyName"
                                    type="text"
                                    value="Green Valley Society" 
                                />
                            </div>

                            <div className="form-group">
                                <label>Delivery Location *</label>
                                <input
                                    name="deliveryLocation"
                                    type="text"
                                    value="Guwahati, Assam" 
                                />
                            </div>

                            <div className="form-group">
                                <label>Number of Families *</label>
                                <input
                                    name="numFamilies"
                                    type="text"
                                    placeholder="e.g., 150"
                                />
                            </div>

                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="form-section-title">Contract Duration</h3>

                        <div className="duration-buttons">
                            <button
                                onClick={() => setSelectedDuration('1 month')}
                                className={`duration-btn ${selectedDuration === '1 month' ? 'selected' : ''}`}
                            >
                                1 month
                            </button>
                            <button
                                onClick={() => setSelectedDuration('6 months')}
                                className={`duration-btn ${selectedDuration === '6 months' ? 'selected' : ''}`}
                            >
                                6 months
                            </button>
                            <button
                                onClick={() => setSelectedDuration('12 months')}
                                className={`duration-btn ${selectedDuration === '12 months' ? 'selected' : ''}`}
                            >
                                12 months
                            </button>
                        </div>

                        <p className="duration-note">
                            Note: The 1-month option is a one-time trial per farmer group.
                        </p>
                    </div>
                    <div className="propose-agreement-section">
                        <button className="propose-btn">
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgreementForm;