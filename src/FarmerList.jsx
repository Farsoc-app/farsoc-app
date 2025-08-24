import React from 'react';
import './FarmerList.css';

function FarmerList({ farmers, setCurrentPage, setSelectedFarmerId }) {
    return (
        <div className="farmer-list-container">
            <div className="header">
                <div className="header-text">
                    <h1>Discover Farmers</h1>
                    <p>Fresh produce, direct from the farm</p>
                </div>
                <button className="profile-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" fill="#333">
                        <path d="M480 576q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160 896v-80q0-54 26-97t70-65q106-53 224-53s224 20 224 53q44 22 70 65t26 97v80H160Z" />
                    </svg>
                </button>
            </div>

            <div className="toolbar">
                <div className="search-bar">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20" fill="#888"><path d="M784 936 532 684q-30 24-69 38t-83 14q-109 0-184.5-75.5T120 476q0-109 75.5-184.5T380 216q109 0 184.5 75.5T640 476q0 44-14 83t-38 69l252 252-56 56ZM380 656q74 0 127-53t53-127q0-74-53-127t-127-53q-74 0-127 53t-53 127q0 74 53 127t127 53Z" /></svg>
                    <input type="text" placeholder="Search for farmer" />
                </div>
                <button className="filter-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20" fill="#333"><path d="M440 856V616L200 376v-80h560v80L520 616v240h-80Z" /></svg>
                </button>
            </div>

            <div className="farmers">
                {farmers.map(farmer => (
                    <div
                        key={farmer.id}
                        className="farmer-card"
                        onClick={() => {
                            setSelectedFarmerId(farmer.id);
                            setCurrentPage('farmerDetail');
                        }}
                    >
                        <div className="farmer-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 576q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160 896v-80q0-54 26-97t70-65q106-53 224-53s224 20 224 53q44 22 70 65t26 97v80H160Z" /></svg>
                        </div>
                        <div className="farmer-details">
                            <h2>{farmer.name}</h2>
                            <p className="location">{farmer.location}</p>
                            <p className="rating">★ {farmer.rating}</p>
                            <p className="farming-type">{farmer.farmingType}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FarmerList;