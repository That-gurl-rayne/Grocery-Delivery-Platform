// src/pages/Payment/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import OrderCard from "../../components/tracking/OrderCard";
import "./CheckoutPage.css";
import { useAuth } from "../../context/AuthContext";

function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [address, setAddress] = useState(user.address || "");
const [name, setName] = useState(user.name || "");
const [phone, setPhone] = useState(user.phone || "");
  const orderItems = [
    { name: "Strawberry drink", price: 1500, quantity: 2 },
    { name: "Pineapple drink", price: 2500, quantity: 1 },
  ];

  return (
    <PageLayout>
      <div className="checkout-page">

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


        {/* Delivery Details Form */}
        <div className="delivery-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="checkout-input"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="checkout-input"
            />
          </div>
          <div className="form-group">
            <label>Delivery Address</label>
            <input
              type="text"
              placeholder="Enter your delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="checkout-input"
            />
          </div>
        </div>

        {/* Order Card */}
      <OrderCard
  orderNumber="1234"
  date="2nd May 2026 by 11:04 am"
  items={orderItems}
  deliveryFee={500}
  address={address || "Enter your delivery address"}
  estimatedArrival="Delivery Expected to arrive on 2nd May by 3:00 pm"
/>

        {/* Place Order Button */}
        <button
          className="place-order-btn"
          onClick={() => navigate("/payment")}
        >
          Place Order 
        </button>

      </div>
    </PageLayout>
  );
}

export default CheckoutPage;