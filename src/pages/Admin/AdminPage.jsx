// src/pages/Admin/AdminPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import defaultProductsList from "../../data/products";
import "./AdminPage.css";

function AdminPage() {
  const { isLoggedIn, user } = useAuth();
  const { orderHistory, updateOrderStatus } = useCart();
  const navigate = useNavigate();

  // Load products list from localStorage
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("oya_products");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return defaultProductsList;
  });

  // Save products list to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("oya_products", JSON.stringify(products));
  }, [products]);

  // Form states for adding product
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Drinks",
    image: "",
    description: ""
  });
  
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Stats
  const totalSales = orderHistory.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orderHistory.length;
  const totalProducts = products.length;

  const handleAddProduct = (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    const { name, price, category, image, description } = newProduct;
    if (!name || !price || !category || !image || !description) {
      setFormError("All product fields are required.");
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError("Price must be a valid positive number.");
      return;
    }

    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const addedItem = {
      id: nextId,
      name,
      price: priceNum,
      category,
      image,
      description
    };

    setProducts(prev => [...prev, addedItem]);
    setFormSuccess(true);
    setNewProduct({
      name: "",
      price: "",
      category: "Drinks",
      image: "",
      description: ""
    });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product? It will be removed from the catalog.")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Check auth
  if (!isLoggedIn || user.role !== "admin") {
    return (
      <PageLayout>
        <div className="admin-access-denied">
          <div className="denied-card">
            <span className="lock-icon">🔒</span>
            <h2>Access Denied</h2>
            <p>You must be logged in as an Administrator to view this dashboard.</p>
            <div className="info-box">
              <p><strong>Seed Admin Credentials:</strong></p>
              <p>Email: <code>admin@oyadeliver.com</code></p>
              <p>Password: <code>admin</code></p>
            </div>
            <button className="login-redirect-btn" onClick={() => navigate("/login")}>
              Go to Login
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="admin-page">
        <h1 className="admin-title">Admin <span className="highlight">Dashboard</span></h1>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">💰</span>
            <div className="stat-info">
              <span className="stat-label">Total Revenue</span>
              <span className="stat-val">N {totalSales}</span>
            </div>
          </div>
          
          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <div className="stat-info">
              <span className="stat-label">Total Orders</span>
              <span className="stat-val">{totalOrders}</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🥦</span>
            <div className="stat-info">
              <span className="stat-label">Total Catalog Products</span>
              <span className="stat-val">{totalProducts}</span>
            </div>
          </div>
        </div>

        <div className="admin-content-layout">
          {/* Add Product Section */}
          <div className="admin-card add-product-card">
            <h2>➕ Add New Grocery Product</h2>
            
            {formError && <div className="admin-error-alert">{formError}</div>}
            {formSuccess && <div className="admin-success-alert">Product added successfully!</div>}

            <form onSubmit={handleAddProduct} className="add-product-form">
              <div className="admin-form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Fresh Milk"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Price (Naira)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1500"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="Drinks">Drinks</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Grains">Grains</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Protein">Protein</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  placeholder="Unsplash URL or image link"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Description / Caption</label>
                <textarea
                  rows="3"
                  placeholder="e.g. Farm fresh organic milk in bottle..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>

              <button type="submit" className="admin-btn">Add to Catalog</button>
            </form>
          </div>

          {/* Orders Tracking Section */}
          <div className="admin-card orders-admin-card">
            <h2>📋 Customer Orders & Dispatch Status</h2>
            {orderHistory.length === 0 ? (
              <p className="no-orders-notice">No client orders placed yet.</p>
            ) : (
              <div className="orders-list">
                {orderHistory.map((order) => (
                  <div key={order.id} className="admin-order-item">
                    <div className="order-summary-header">
                      <span><strong>Order ID:</strong> #{order.id}</span>
                      <span><strong>Total:</strong> N {order.total}</span>
                    </div>
                    <p className="order-details-desc">
                      {order.items.map(item => `${item.name} (x${item.quantity})`).join(", ")}
                    </p>
                    <p className="order-address-text">📍 {order.address}</p>
                    
                    <div className="status-updater-row">
                      <label>Update Status:</label>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`status-select ${order.status}`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Catalog List Section */}
        <div className="admin-card catalog-list-card">
          <h2>🥦 Manage Products Catalog ({products.length})</h2>
          <div className="admin-products-table-wrapper">
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.image} alt={p.name} className="table-product-img" />
                    </td>
                    <td>
                      <strong>{p.name}</strong>
                      <p className="table-product-desc">{p.description}</p>
                    </td>
                    <td><span className="category-tag">{p.category}</span></td>
                    <td>N {p.price}</td>
                    <td>
                      <button className="table-delete-btn" onClick={() => handleDeleteProduct(p.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

export default AdminPage;
