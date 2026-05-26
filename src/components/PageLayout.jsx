// src/components/PageLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import skyline from "../assets/skyline.png";
import "./PageLayout.css";

function PageLayout({ children }) {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        {children}
      </div>
      <img src={skyline} alt="" className="skyline" />
    </div>
  );
}

export default PageLayout;