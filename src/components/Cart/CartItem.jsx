// src/components/cart/CartItem.jsx
import React from "react";
import "./CartItem.css";

function CartItem({ image, name, price, quantity, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">

      {/* Product Image */}
      <div className="cart-item-image-container">
        <img src={image} alt={name} className="cart-item-image" />
        <span className="cart-item-price">N {price}</span>
      </div>

      {/* Controls */}
      <div className="cart-item-controls">
        {/* Quantity Row */}
        <div className="cart-item-top-row">
          <button className="quantity-label">Quantity</button>
          <button className="remove-btn" onClick={onRemove}>Remove</button>
        </div>

        {/* Quantity Selector + Minus */}
        <div className="cart-item-bottom-row">
          <div className="quantity-selector">
            <button className="multiply-icon">✕</button>
            <span className="quantity-number">{quantity}</span>
          </div>
          <button className="decrease-btn" onClick={onDecrease}>−</button>
        </div>
      </div>

      {/* Product Name */}
      <p className="cart-item-name">{name}</p>

    </div>
  );
}

export default CartItem;