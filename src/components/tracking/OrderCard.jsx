// src/components/tracking/OrderCard.jsx
import React from "react";
import "./OrderCard.css";

function OrderCard({ orderNumber, date, items, deliveryFee = 500, address, estimatedArrival }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0) + deliveryFee;

  return (
    <div className="order-card">

      {/* Order Details Header */}
      <div className="order-details-header">
        <span>Order Details</span>
        <span>Total</span>
        <span>N {total}</span>
      </div>

      {/* Items */}
      <div className="order-items">
        {items.map((item, index) => (
          <div className="order-item-row" key={index}>
            <span>{item.name} X{item.quantity}</span>
            <span>N {item.price * item.quantity}</span>
          </div>
        ))}
        <div className="order-item-row">
          <span>Delivery fee</span>
          <span>N {deliveryFee}</span>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="delivery-address">
        <div className="address-header">
          <span>📍</span>
          <span>Delivery Address</span>
        </div>
        <p>{address}</p>
        <p className="estimated">{estimatedArrival}</p>
      </div>

    </div>
  );
}

export default OrderCard;