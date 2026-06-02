// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  const { cartCount } = useCart();
  const { isLoggedIn, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <NavLink to="/">
          <img src={logo} alt="Oya Deliver" />
        </NavLink>
      </div>

      {/* Burger Menu Button for Mobile */}
      <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle menu">
        <span className={`burger-bar ${isMenuOpen ? "open" : ""}`}></span>
        <span className={`burger-bar ${isMenuOpen ? "open" : ""}`}></span>
        <span className={`burger-bar ${isMenuOpen ? "open" : ""}`}></span>
      </button>

      {/* Links */}
      <ul className={`navbar-links ${isMenuOpen ? "mobile-open" : ""}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsMenuOpen(false)}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsMenuOpen(false)}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsMenuOpen(false)}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsMenuOpen(false)}>
            Settings
          </NavLink>
        </li>
        {isLoggedIn && user && user.role === "admin" && (
          <li>
            <NavLink to="/admin" className={({ isActive }) => isActive ? "active admin-link" : "admin-link"} onClick={() => setIsMenuOpen(false)}>
              Admin 🛠️
            </NavLink>
          </li>
        )}
      </ul>

      {/* Icons */}
      <div className="navbar-icons">
        <NavLink to="/cart" className={({ isActive }) => isActive ? "active-icon" : ""}>
          <div className="cart-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#0F0F0F" strokeWidth="2"/>
              <line x1="3" y1="6" x2="21" y2="6" stroke="#0F0F0F" strokeWidth="2"/>
              <path d="M16 10a4 4 0 01-8 0" stroke="#0F0F0F" strokeWidth="2"/>
            </svg>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </NavLink>

        {/* Profile icon — goes to profile if logged in, login if not */}
        <NavLink
          to={isLoggedIn ? "/profile" : "/login"}
          className={({ isActive }) => isActive ? "active-icon" : ""}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#0F0F0F" strokeWidth="2"/>
            <circle cx="12" cy="7" r="4" stroke="#0F0F0F" strokeWidth="2"/>
          </svg>
        </NavLink>
      </div>

    </nav>
  );
}

export default Navbar;