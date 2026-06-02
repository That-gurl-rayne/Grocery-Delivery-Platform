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
  const [error, setError] = useState("");

  const orderDate = new Date().toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  const handlePlaceOrder = () => {
    if (!name || !phone || !address) {
      setError("Please fill in all delivery details before placing your order.");
      return;
    }
    localStorage.setItem("oya_checkout_name", name);
    localStorage.setItem("oya_checkout_phone", phone);
    localStorage.setItem("oya_checkout_address", address);
    navigate("/payment");
  };

  return (
    <PageLayout>
      <div className="checkout-page">

        {/* Back button */}
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>

        {/* Order Header */}
        <div className="order-header">
          <h1>New <span className="order-number">Order</span></h1>
          <div className="order-date-pill">
            Draft created {orderDate}
          </div>
        </div>

        {error && (
          <div className="checkout-error" style={{ color: "#e74c3c", backgroundColor: "#fdeae8", padding: "10px 15px", borderRadius: "5px", marginBottom: "20px", fontSize: "14px", fontWeight: "500" }}>
            {error}
          </div>
        )}

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
          orderNumber="Draft"
          date={orderDate}
          items={cartItems}
          deliveryFee={500}
          address={address || "Enter your delivery address"}
          estimatedArrival="Delivery Expected to arrive in 30-45 minutes"
        />

        {/* Place Order Button */}
        <button
          className="place-order-btn"
          onClick={handlePlaceOrder}
        >
          Place Order →
        </button>

      </div>
    </PageLayout>
  );
}

export default CheckoutPage;