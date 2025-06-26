import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <a href="/"><img src="g_logo.png" alt="Logo" className="navbar-logo" /></a>
      </div>
      
      <div className="navbar-right">
        <a href="#heropage" className="nav-item">Home</a>
        
        <a href="#about" className="nav-item">How it Works</a>
        <a href="#about-us" className="nav-item">About Us</a>
        <a href="#difference" className="nav-item">What Makes Us Different</a>
        
        
      </div>
    </div>
  );
};

export default Navbar;
