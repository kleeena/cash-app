import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoClick = () => {
    navigate("/"); // Redirect to homepage
  };


  return (
    <div className='nav-container'>
        <header className="header">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src="/assets/CashApp.svg" alt="Logo" />
      </div>
      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleDropdown}>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        )}
      </div>
    </header>
    </div>
    
  );
};

export default Navbar;