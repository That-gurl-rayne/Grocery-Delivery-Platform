// src/pages/Home/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import SearchBar from "../../components/Products/SearchBar";
import "./HomePage.css";

const categories = [
  { name: "Drinks", image: "https://images.unsplash.com/photo-1650547001322-145ff2c0bed7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Vegetables", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300" },
  { name: "Grains", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300" },
  { name: "Snacks", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300" },
  { name: "Fruits", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300" },
  { name: "Protein", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300" },
];
const phrases = [
  { text: "Fresh Groceries...", color: "#0F0F0F" },
  { text: " Fast Fast...", color: "#E9B118" },
  { text: "To Your Home...", color: "#2ECC71" },
];

function HomePage() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout>
      <div className="home-page">

        {/* Search Bar */}
        <div className="search-section">
          <SearchBar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Hero Text */}
        <div className="hero-text">
          <h2>
            Fresh Groceries, Delivers{" "}
            <span
              className="animated-phrase"
              style={{ color: phrases[currentPhrase].color }}
            >
              {phrases[currentPhrase].text}
            </span>
          </h2>
        </div>

        {/* Categories */}
        <div className="categories-row">
          {categories.map((cat, index) => (
            <Link to="/products" key={index} className="category-card">
              <img src={cat.image} alt={cat.name} />
              <p>{cat.name}</p>
            </Link>
          ))}
        </div>

        {/* How it works */}
        <div className="how-it-works">
          <button className="hiw-title">How it works</button>
          <div className="hiw-steps">
            <div className="hiw-step">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#0F0F0F" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="#0F0F0F" strokeWidth="2"/>
              </svg>
              <span>Browse</span>
            </div>
            <div className="hiw-step">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#0F0F0F" strokeWidth="2"/>
                <line x1="3" y1="6" x2="21" y2="6" stroke="#0F0F0F" strokeWidth="2"/>
              </svg>
              <span>Add to cart</span>
            </div>
            <div className="hiw-step">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="1" y="3" width="15" height="13" stroke="#0F0F0F" strokeWidth="2"/>
                <path d="M16 8h4l3 3v5h-7V8z" stroke="#0F0F0F" strokeWidth="2"/>
                <circle cx="5.5" cy="18.5" r="2.5" stroke="#0F0F0F" strokeWidth="2"/>
                <circle cx="18.5" cy="18.5" r="2.5" stroke="#0F0F0F" strokeWidth="2"/>
              </svg>
              <span>Get Delivered</span>
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

export default HomePage;