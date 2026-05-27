// src/components/cart/CartSummary.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./CartSummary.css";

function CartSummary({ items, deliveryFee = 500 }) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="cart-summary">

      {/* Total Header */}
      <div className="summary-header">
        <h2>Total</h2>
      </div>

      {/* Items breakdown */}
      <div className="summary-items">
        {items.map((item, index) => (
          <div className="summary-row" key={index}>
            <span>{item.name}</span>
            <span>N {item.price * item.quantity}</span>
          </div>
        ))}

        {/* Delivery fee */}
        <div className="summary-row">
          <span className="delivery-fee-label">Delivery fee</span>
          <span>N {deliveryFee}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link to="/checkout" className="checkout-btn">
        <span>Checkout</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
            stroke="#0F0F0F" strokeWidth="2"/>
          <line x1="3" y1="6" x2="21" y2="6"
            stroke="#0F0F0F" strokeWidth="2"/>
          <path d="M16 10a4 4 0 01-8 0"
            stroke="#0F0F0F" strokeWidth="2"/>
        </svg>
        <span className="total-amount">N {grandTotal}</span>
        <span className="arrow">→</span>
      </Link>

    </div>
  );
}

export default CartSummary;