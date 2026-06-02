// src/pages/About/AboutPage.jsx
import React from "react";
import PageLayout from "../../components/PageLayout";
import "./AboutPage.css";

function AboutPage() {
  return (
    <PageLayout>
      <div className="about-page">
        <h1 className="about-title">About <span className="highlight">Oya Deliver</span></h1>
        
        <p className="about-intro">
          Oya Deliver is a real-world, premium grocery delivery application designed to make grocery shopping 
          fast, fresh, and frictionless. Users can browse categorized fresh produce, search for specific items, 
          add items to their cart, securely check out, and track their delivery status in real-time.
        </p>

        {/* Project Context Box */}
        <div className="project-card academic-card">
          <h2>🎓 Student Project Submission Details</h2>
          <div className="project-details-grid">
            <div className="detail-row">
              <strong>Project Title:</strong>
              <span>Oya Deliver - Grocery Delivery Platform</span>
            </div>
            <div className="detail-row">
              <strong>Group Name:</strong>
              <span>ICT 211 Group D /Software Engineering</span>
            </div>
            <div className="detail-row">
              <strong>Group Members </strong>
             
            </div>
             <span>Udunna Yoanna Juochi -
                Matric No: LCU/UG/24/33010
              </span>
              <span>Adesegun Martins Samad -
                Matric No: LCU/UG/24/31515
              </span>
              <span>Izuchukwu Munachi Delight Chiamamka - 
                Matric No: LCU/UG/24/31866
              </span>
              <span>Ademola OluwaPelumi Paul -
                Matric No: LCU/UG/24/33187
              </span>
              <span>Okeke Chinedu Emmanuel -
                Matric No: LCU/UG/24/29328
              </span>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="about-grid">
          <div className="project-card">
            <h3>✨ Key Features</h3>
            <ul>
              <li>🛒 <strong>Cart Management:</strong> Add, remove, and adjust quantities dynamically.</li>
              <li>🔍 <strong>Search & Categories:</strong> Filter products by food group or search by text.</li>
              <li>🔒 <strong>Mock Auth:</strong> User registration, login, and profile modification.</li>
              <li>📦 <strong>Admin Panel:</strong> Create, view, update, and delete products, and manage order statuses.</li>
              <li>🛰️ <strong>Real-time Tracking:</strong> Track whether your order is Processing, Out for Delivery, or Delivered.</li>
              <li>💾 <strong>Local Storage Database:</strong> Full state persistence for carts, history, and catalog.</li>
            </ul>
          </div>

          <div className="project-card">
            <h3>🛠️ Tools & Technologies</h3>
            <ul>
              <li><strong>Frontend:</strong> React 19, JavaScript (ES6+), HTML5</li>
              <li><strong>Styling:</strong> CSS3 (Custom Variables, Flexbox, Grids, Responsive Media Queries)</li>
              <li><strong>Routing:</strong> React Router Dom v7</li>
              <li><strong>State:</strong> React Context API (Cart & Auth Contexts)</li>
              <li><strong>Persistence:</strong> Web Storage API (LocalStorage)</li>
              <li><strong>Images:</strong> Unsplash Optimized Groceries Catalog CDN</li>
            </ul>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mission-statement">
          <blockquote>
            "Our goal is to combine technology and logistical excellence to deliver nutrition to households in under 45 minutes, reducing food waste and supporting local farmers."
          </blockquote>
        </div>
      </div>
    </PageLayout>
  );
}

export default AboutPage;
