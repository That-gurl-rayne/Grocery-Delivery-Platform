// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand & Info */}
        <div className="footer-brand">
          <h3 className="brand-logo">Oya <span className="logo-accent">Deliver</span></h3>
          <p className="brand-tagline">Fresh groceries delivered fast to your doorstep in 45 minutes.</p>
          <p className="academic-tag">🎓 Developed by HP Group</p>
        </div>

        {/* Links Grid */}
        <div className="footer-links-section">
          <h4>Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Product Catalog</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/settings">App Settings</Link></li>
          </ul>
        </div>

        {/* Operating Hours */}
        <div className="footer-hours">
          <h4>Hours of Service</h4>
          <p><strong>Mon - Sat:</strong> 7:00 AM - 10:00 PM</p>
          <p><strong>Sunday:</strong> 9:00 AM - 8:00 PM</p>
          <p><strong>Hotline:</strong> +234 801 234 5678</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Oya Deliver. All rights reserved. Made for academic submission.</p>
      </div>
    </footer>
  );
}

export default Footer;
