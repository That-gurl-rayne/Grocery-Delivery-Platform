// src/components/LoadingScreen.jsx
import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";
import logo from "../assets/logo.png";

function LoadingScreen() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-content">

        {/* Oya DeliverLogo */}
        <div className="loading-logo">
          <img src={logo} alt="Oya Deliver" />
        </div>

        {/* the spinning wheel */}
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
        </div>

        {/* Loading text */}
        <p className="loading-text">Getting your groceries ready{dots}</p>

        {/* the tagline */}
        <p className="loading-tagline">Fresh. Fast. Delivered.</p>

      </div>
    </div>
  );
}

export default LoadingScreen;