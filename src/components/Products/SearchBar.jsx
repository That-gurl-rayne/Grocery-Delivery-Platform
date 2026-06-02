// src/components/products/SearchBar.jsx
import React from "react";
import "./SearchBar.css";

function SearchBar({ value, onChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <button className="search-btn" onClick={onSearch}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#0F0F0F" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="#0F0F0F" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;