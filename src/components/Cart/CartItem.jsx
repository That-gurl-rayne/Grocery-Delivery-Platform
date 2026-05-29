// src/components/Cart/CartItem.jsx
import React from "react";
import "./CartItem.css";

function CartItem({ image, name, price, quantity, onDecrease, onRemove }) {
  return (
    <div className="cart-item">

      {/* Left — Image + Name */}
      <div className="cart-item-left">
        <div className="cart-item-image-container">
          <img src={image} alt={name} className="cart-item-image" />
          <span className="cart-item-price">N {price}</span>
        </div>
        <p className="cart-item-name">{name}</p>
      </div>

      {/* Right — Controls */}
      <div className="cart-item-right">

        {/* Row 1 — Quantity + Remove */}
        <div className="cart-item-row">
          <button className="quantity-label">Quantity</button>
          <button className="remove-btn" onClick={onRemove}>Remove</button>
        </div>

        {/* Row 2 — X quantity + minus */}
        <div className="cart-item-row">
          <div className="quantity-selector">
            <span className="multiply-icon">✕</span>
            <span className="quantity-number">{quantity}</span>
          </div>
          <button className="decrease-btn" onClick={onDecrease}>−</button>
        </div>

      </div>
    </div>
  );
}

export default CartItem;