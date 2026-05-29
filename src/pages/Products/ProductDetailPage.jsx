// src/pages/Products/ProductDetailPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import ProductCard from "../../components/Products/ProductCard";
import { useCart } from "../../context/CartContext";
import products from "../../data/products";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));
  const related = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 2);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <PageLayout>
      <div className="product-detail-page">

        {/* Back button */}
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>

        {/* Product Image */}
        <div className="detail-image-container">
          <img src={product.image} alt={product.name} className="detail-image" />
          <span className="detail-price">N {product.price}</span>
        </div>

        {/* Product Name */}
        <h2 className="detail-name">{product.description}</h2>

        {/* Quantity + Add to Cart */}
        <div className="detail-actions">
          <button className="quantity-label-btn">Quantity</button>
          <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
          <span className="qty-number">{quantity}</span>
          <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
          <button
            className={`detail-add-cart ${added ? "added" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? "Added! ✓" : (
              <>
                Add to cart
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#FFFAF4" strokeWidth="2"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="#FFFAF4" strokeWidth="2"/>
                </svg>
              </>
            )}
          </button>
        </div>

        {/* More Like This */}
        {related.length > 0 && (
          <div className="related-section">
            <h3 className="related-title">More Like this</h3>
            <div className="related-grid">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  onAddToCart={() => addToCart(item)}
                  onClick={() => navigate(`/products/${item.id}`)}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </PageLayout>
  );
}

export default ProductDetailPage;