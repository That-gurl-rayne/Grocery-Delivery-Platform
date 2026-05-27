// src/components/tracking/TrackingBar.jsx
import React from "react";
import "./TrackingBar.css";

const steps = [
  "Order Placed",
  "Confirmed",
  "Picked Up",
  "On the Way",
  "Delivered"
];

function TrackingBar({ currentStep = 1 }) {
  return (
    <div className="tracking-bar">
      <h3 className="tracking-title">Delivery Status</h3>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-wrapper" key={index}>

            {/* Circle */}
            <div className={`step-circle ${index <= currentStep ? "active" : ""}`}/>

            {/* Line between steps */}
            {index < steps.length - 1 && (
              <div className={`step-line ${index < currentStep ? "active" : ""}`}/>
            )}

            {/* Label */}
            <span className={`step-label ${index <= currentStep ? "active-label" : ""}`}>
              {step}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackingBar;