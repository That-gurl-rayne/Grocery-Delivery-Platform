// src/components/products/ProductCard.jsx
import React from "react";
import "./ProductCard.css";

function ProductCard({ image, name, price, onAddToCart }) {
  return (
    <div className="product-card">
      {/* Product Image with Price */}
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        <span className="product-price">N {price}</span>
      </div>

      {/* Product Name */}
      <button className="product-name-btn">{name}</button>

      {/* Add to Cart Button */}
      <button className="add-to-cart-btn" onClick={onAddToCart}>
        Add to cart
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" 
            stroke="#FFFAF4" strokeWidth="2"/>
          <line x1="3" y1="6" x2="21" y2="6" 
            stroke="#FFFAF4" strokeWidth="2"/>
          <path d="M16 10a4 4 0 01-8 0" 
            stroke="#FFFAF4" strokeWidth="2"/>
        </svg>
      </button>
    </div>
  );
}

export default ProductCard;