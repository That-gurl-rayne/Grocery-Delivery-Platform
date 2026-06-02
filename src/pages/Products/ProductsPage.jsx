// src/pages/Products/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import SearchBar from "../../components/Products/SearchBar";
import ProductCard from "../../components/Products/ProductCard";
import { useCart } from "../../context/CartContext";
import products from "../../data/products";
import "./ProductsPage.css";

const categories = ["All", "Drinks", "Vegetables", "Grains", "Snacks", "Fruits", "Protein"];

function ProductsPage() {
   eslint-disable-next-line
  const [productList, setProductList] = useState(() => {
    const stored = localStorage.getItem("oya_products");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // Fallback
      }
    }
    localStorage.setItem("oya_products", JSON.stringify(products));
    return products;
  });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) setActiveCategory(cat);
    
    const query = params.get("search");
    if (query) setSearch(query);
  }, [location.search]);

  const filtered = productList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const grouped = activeCategory === "All"
    ? categories.filter(c => c !== "All").reduce((acc, cat) => {
        const items = filtered.filter(p => p.category === cat);
        if (items.length > 0) acc[cat] = items;
        return acc;
      }, {})
    : { [activeCategory]: filtered };

  return (
    <PageLayout>
      <div className="products-page">

        {/* Search Bar */}
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter Bar */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid by Category */}
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="products-grid">
              {items.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  onAddToCart={() => addToCart(product)}
                  onClick={() => navigate(`/products/${product.id}`)}
                />
              ))}
            </div>
          </div>
        ))}

      </div>
    </PageLayout>
  );
}

export default ProductsPage;