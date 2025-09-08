import './App.css'
import React, { useState, useEffect } from 'react';
import { account } from './appwrite';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import FarmerSignupPage from './FarmerSignupPage';
import FarmerList from './FarmerList';
import FarmerDetail from './FarmerDetail';
import Header from './Header';
import UserProfilePage from './UserProfilePage';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import AgreementForm from './AgreementForm';
import farsocLogo from './assets/farsoc-logo.png';
import FarmerIcon from './assets/farmer.svg?react';
import SocietyIcon from './assets/society.svg?react';
import GoogleAuthPage from './GoogleAuthPage';
import FarmerDashboard from './FarmerDashboard';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const [farmers] = useState([
    {
      id: 1,
      name: 'A Farmers Group',
      location: 'Kamrup, Assam',
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
        frequency: 'Weekly',
        emergency: 'Available (48hr notice)',
        payment: 'Monthly billing',
        quality: 'Guaranteed Fresh: Damaged produce will be replaced upon review.',
      }
    },
    {
      id: 2,
      name: 'B Farmers Group',
      location: 'Kamrup, Assam',
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
        frequency: 'Weekly (every Monday)',
        emergency: 'Not available',
        payment: 'Payment on delivery',
        quality: 'Grade A produce guaranteed',
      },
      reviews: [
        {
          id: 1,
          societyName: 'Society 1',
          rating: 5,
          comment: 'The produce is always fresh.',
          date: '12/08/2025'
        },
        {
          id: 2,
          societyName: 'Society 2',
          rating: 4,
          comment: 'Good service and reliable delivery.',
          date: '05/07/2025'
        }
      ]
    }
  ]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const isAuth = !!user;

  return (
    <Routes>
      <Route path="/" element={
        <div className="welcome-container">
          <div className="logo-container">
            <img src={farsocLogo} alt="Farsoc company logo" className="logo-emoji" />
          </div>
          <h1 className="brand-name">Farsoc</h1>
          <p className="tagline">
            Connecting farmers directly with housing societies for fresh, bulk produce.
          </p>
          <div className="role-selection">
            <Link to="/login?role=farmer" className="role-button farmer-btn">
              <FarmerIcon className="role-icon" />
              <span className="role-title">I am a Farmer</span>
              <span className="role-subtitle">Sell your produce directly</span>
            </Link>
            <Link to="/login?role=buyer" className="role-button society-btn">
              <SocietyIcon className="role-icon" />
              <span className="role-title">I am a Buyer/Society</span>
              <span className="role-subtitle highlighted">Source fresh produce in bulk</span>
            </Link>
          </div>
          <p className="footer-text">
            Join thousands of farmers and societies building sustainable food networks.
          </p>
        </div>
      } />
      <Route path="/login" element={<GoogleAuthPage />} />

      <Route
        path="/farmers/dashboard"
        element={isAuth ? <FarmerDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/farmers/list"
        element={isAuth ? <FarmerList farmers={farmers} /> : <Navigate to="/login" />}
      />
      <Route
        path="/farmers/:farmerId"
        element={isAuth ? <FarmerDetail farmers={farmers} /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={isAuth ? <UserProfilePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/signup/farmer"
        element={isAuth ? <FarmerSignupPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/farmers/:farmerId/agreement"
        element={isAuth ? <AgreementForm /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App