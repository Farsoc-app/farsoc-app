import { useParams, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'; 
import './AgreementForm.css';

// We pass the farmer's data into this component to get the available durations
function AgreementForm({ farmers }) { // <-- Note: 'farmers' (plural), not 'farmer'
    const { farmerId } = useParams();
    const navigate = useNavigate(); // We'll use this for the back button
    const [selectedDuration, setSelectedDuration] = useState(null);

    // Find the specific farmer from the array using the ID from the URL
    const farmer = farmers.find(f => f.id == farmerId);

    // A placeholder for the user's info.
    const societyInfo = {
        name: "Green Valley Society",
        deliveryLocation: "Guwahati, Assam",
    };

    // If the farmer data hasn't loaded yet, show a loading message
    if (!farmer) {
        return <div>Loading farmer details...</div>;
    }

    return (
        <div className="agreement-page">
            <div className="agreement-form-container">

                <div className="agreement-form">
                    <div className="form-section">
                        <h3 className="form-section-title">Agreement with {farmer.name}</h3>
                        <p className="farmer-location-subtitle">{farmer.location}</p>
                    </div>

                    <div className="form-section">
                        <h3 className="form-section-title">Society Information</h3>

                        <div className="input-grid">  {/* <-- 1. Add this main grid container */}

                            <div className="form-group">  {/* <-- 2. Wrap each field in a group */}
                                <label>Society Name *</label>
                                <input
                                    name="societyName"
                                    type="text"
                                    value="Green Valley Society" /* This will come from state later */
                                />
                            </div>

                            <div className="form-group">
                                <label>Delivery Location *</label>
                                <input
                                    name="deliveryLocation"
                                    type="text"
                                    value="Guwahati, Assam" /* This will come from state later */
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