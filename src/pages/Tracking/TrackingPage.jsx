// src/pages/Tracking/TrackingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import TrackingBar from "../../components/tracking/TrackingBar";
import OrderCard from "../../components/tracking/OrderCard";
import "./TrackingPage.css";

function TrackingPage() {
  const navigate = useNavigate();

  const orderItems = [
    { name: "Apple Juice", price: 1500, quantity: 1 },
  ];

  return (
    <PageLayout>
      <div className="tracking-page">

        {/* Back button */}
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>

        {/* Order Header */}
        <div className="order-header">
          <h1>Order <span className="order-number">1234</span></h1>
          <div className="order-date-pill">
            Ordered on 2nd May 2026 by 11:04 am
          </div>
        </div>

        {/* Tracking Bar */}
        <TrackingBar currentStep={1} />

        {/* Order Card */}
        <OrderCard
          orderNumber="1234"
          items={orderItems}
          deliveryFee={500}
          address="15 Chevron Wale AVE, Lagos, Nigeria"
          estimatedArrival="Delivery Expected to arrive on 2nd May by 3:00 pm"
        />

      </div>
    </PageLayout>
  );
}

export default TrackingPage;