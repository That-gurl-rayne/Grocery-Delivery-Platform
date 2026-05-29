// src/components/Products/ProductCard.jsx
import React, { useState } from "react";
import "./ProductCard.css";

function ProductCard({ image, name, price, onAddToCart, onClick }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">

      {/* Image */}
      <div className="product-image-container" onClick={onClick} style={{ cursor: "pointer" }}>
        <img src={image} alt={name} className="product-image" />
        <span className="product-price">N {price}</span>
      </div>

      {/* Name */}
      <button className="product-name-btn" onClick={onClick}>{name}</button>

      {/* Add to Cart */}
      <button className={`add-to-cart-btn ${added ? "added" : ""}`} onClick={handleAddToCart}>
        {added ? "Added! ✓" : (
          <>
            Add to cart
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#FFFAF4" strokeWidth="2"/>
              <line x1="3" y1="6" x2="21" y2="6" stroke="#FFFAF4" strokeWidth="2"/>
              <path d="M16 10a4 4 0 01-8 0" stroke="#FFFAF4" strokeWidth="2"/>
            </svg>
          </>
        )}
      </button>

    </div>
  );
}

export default ProductCard;