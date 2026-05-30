// src/pages/Payment/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import OrderCard from "../../components/tracking/OrderCard";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./CheckoutPage.css";

function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems } = useCart();

  const [address, setAddress] = useState(user.address || "");
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");

  const orderDate = new Date().toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return (
    <PageLayout>
      <div className="checkout-page">

        {/* Back button */}
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>

        {/* Order Header */}
        <div className="order-header">
          <h1>Order <span className="order-number">1234</span></h1>
          <div className="order-date-pill">
            Ordered on {orderDate}
          </div>
        </div>

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
          date={orderDate}
          items={cartItems}
          deliveryFee={500}
          address={address || "Enter your delivery address"}
          estimatedArrival="Delivery Expected to arrive in 30-45 minutes"
        />

        {/* Place Order Button */}
        <button
          className="place-order-btn"
          onClick={() => navigate("/payment")}
        >
          Place Order →
        </button>

      </div>
    </PageLayout>
  );
}

export default CheckoutPage;