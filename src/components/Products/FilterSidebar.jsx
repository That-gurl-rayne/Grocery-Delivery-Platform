// src/components/products/FilterSidebar.jsx
import React from "react";
import "./FilterSidebar.css";

const CATEGORIES = ["All", "Fruits", "Vegetables", "Drinks", "Grains", "Protein", "Snacks"];

function FilterSidebar({ selectedCategory, onCategoryChange, priceRange, onPriceChange }) {
  return (
    <aside className="filter-sidebar">
      <div className="filter-section">
        <h4 className="filter-section-title">Category</h4>
        <ul className="category-list">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => onCategoryChange(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">Max Price</h4>
        <input
          type="range"
          min={100}
          max={10000}
          step={100}
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="price-slider"
        />
        <p className="price-label">Up to ₦{priceRange.toLocaleString()}</p>
      </div>

      <button
        className="reset-btn"
        onClick={() => {
          onCategoryChange("All");
          onPriceChange(10000);
        }}
      >
        Reset Filters
      </button>
    </aside>
  );
}

export default FilterSidebar;