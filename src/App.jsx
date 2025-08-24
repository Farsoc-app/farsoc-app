import './App.css'
import React, { useState } from 'react';
import BuyerProfile from './BuyerProfile';
import FarmerList from './FarmerList';
import FarmerDetail from './FarmerDetail';
import Header from './Header';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  const [selectedFarmerId, setSelectedFarmerId] = useState(null);

  const farmers = [
    {
      id: 1,
      name: 'Green Valley Farmers Group',
      location: 'Nalbari, Assam',
      phone: '9876543210',
      rating: 4.8,
      farmingType: 'Organic Farming',
      produce: {
        vegetables: [
          { name: 'Tomatoes', price: 45 },
          { name: 'Cabbage', price: 25 },
          { name: 'Potatoes', price: 30 },
        ],
        fruits: [
          { name: 'Assam Lemon', price: 5, unit: 'piece' },
        ],
        dairy: [ 
          { name: 'Fresh Paneer', price: 400 },
          { name: 'Cow Ghee', price: 650 },
        ], 

        grains: [
          { name: 'Basmati Rice', price: 90 },
          { name: 'Whole Wheat', price: 40 },
        ],
        pulses: [
          { name: 'Moong Dal', price: 120 },
          { name: 'Masoor Dal', price: 110 },
        ],
        spices: [
          { name: 'Turmeric Powder', price: 200 },
          { name: 'Chilli Powder', price: 250 },
        ],
        oils: [
          { name: 'Mustard Oil', price: 180, unit: 'litre' },
        ]
      },
      agreementDetails: {
        minDuration: '6 months (extendable)',
        frequency: 'Weekly (every Tuesday & Friday)',
        emergency: 'Available (48hr notice)',
        payment: 'Monthly billing',
        quality: 'Guaranteed Fresh: Damaged produce will be replaced upon review.',
      }
    },
    {
      id: 2,
      name: 'Brahmaputra Fresh Produce',
      location: 'Sonitpur, Assam',
      phone: '9876543211',
      rating: 4.5,
      farmingType: 'Chemical Farming',
      produce: {
        vegetables: [
          { name: 'Onions', price: 35 },
          { name: 'Carrots', price: 50 },
          { name: 'Radish', price: 30 },
        ],
      },
      agreementDetails: {
        minDuration: '12 months',
        frequency: 'Bi-weekly (every Monday)',
        emergency: 'Not available',
        payment: 'Payment on delivery',
        quality: 'Grade A produce guaranteed',
      },
      reviews: [
        {
          id: 1,
          societyName: 'Royal Towers',
          rating: 5,
          comment: 'The produce is always fresh, especially the carrots. Highly recommended.',
          date: '12/08/2025'
        },
        {
          id: 2,
          societyName: 'City View Apartments',
          rating: 4,
          comment: 'Good service and reliable delivery.',
          date: '05/07/2025'
        }
      ]
    }
  ];

  if (currentPage === 'farmer') {
    return <FarmerDashboard />;
  }
  if (currentPage === 'farmerList') {
    return (
      <FarmerList
        farmers={farmers}
        setCurrentPage={setCurrentPage}
        setSelectedFarmerId={setSelectedFarmerId}
      />
    );
  }
  if (currentPage === 'farmerDetail') {
    return (
      <FarmerDetail
        farmers={farmers}
        selectedFarmerId={selectedFarmerId}
        setCurrentPage={setCurrentPage}
      />
    );
  }
  if (currentPage === 'society') {
    return (
      <div className="page-center">
        <BuyerProfile setCurrentPage={setCurrentPage} />
      </div>
    );
  }
  return (
    <div className="welcome-container">
      <div className="logo-container">
        <span className="logo-emoji">🌾</span>
      </div>
      <h1 className="brand-name">Farsoc</h1>
      <p className="tagline">
        Connecting farmers directly with housing societies for fresh, bulk produce.
      </p>

      <div className="role-selection">
        <button className="role-button farmer-btn" onClick={() => setCurrentPage('farmer')}>
          <span className="role-icon">🧑‍🌾</span>
          <span className="role-title">I am a Farmer</span>
          <span className="role-subtitle">Sell your produce directly</span>
        </button>

        <button className="role-button society-btn" onClick={() => setCurrentPage('society')}>
          <span className="role-icon">🏢</span>
          <span className="role-title">I am a Buyer/Society</span>
          <span className="role-subtitle highlighted">Source fresh produce in bulk</span>
        </button>
      </div>

      <p className="footer-text">
        Join thousands of farmers and societies building sustainable food networks.
      </p>
    </div>
  )
}

export default App