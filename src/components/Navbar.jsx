import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout, onProfile }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar floating-navbar">
      <div className="navbar-left" onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}>
        <img src="/logo192.png" alt="Logo" className="navbar-logo" />
        <span className="navbar-title">Rep Tracker</span>
      </div>
      <div className="navbar-center">
        <button className="navbar-btn navbar-history" onClick={() => navigate('/history')}>Previous Workouts</button>
      </div>
      <div className="navbar-actions">
        <button className="navbar-btn" onClick={onProfile} title="Profile">
          <span role="img" aria-label="profile">👤</span>
        </button>
        <button className="navbar-btn logout" onClick={onLogout}>LOGOUT</button>
      </div>
    </nav>
  );
};

export default Navbar; 