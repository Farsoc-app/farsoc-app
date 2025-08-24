import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <h1 className="app-logo">Farsoc</h1>
      <div className="user-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
    </header>
  );
}

export default Header;