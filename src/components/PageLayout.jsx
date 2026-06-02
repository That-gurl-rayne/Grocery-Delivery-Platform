// src/components/PageLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import skyline from "../assets/skyline.png";
import "./PageLayout.css";

function PageLayout({ children }) {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        {children}
      </div>
      <div className="skyline-wrapper">
        <img src={skyline} alt="" className="skyline" />
      </div>
      <Footer />
    </div>
  );
}

export default PageLayout;