// src/pages/Tracking/OrderHistoryPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import "./OrderHistoryPage.css";

const orders = [
  {
    id: 1234,
    date: "2nd May 2026 by 11:04 am",
    items: [
      { name: "Strawberry drink", quantity: 2 },
      { name: "Pineapple drink", quantity: 1 },
    ],
    total: 6000,
    status: "Delivered",
  },
];

function OrderHistoryPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="order-history-page">

        {/* Back button */}
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>

        {/* Title */}
        <h1 className="history-title">
          Order <span className="history-highlight">History</span>
        </h1>

        {/* Orders */}
        {orders.map((order) => (
          <div key={order.id} className="order-card">

            {/* Order Number */}
            <button className="order-number-pill">Order {order.id}</button>

            {/* Date */}
            <div className="order-date-pill">
              Ordered on {order.date}
            </div>

            {/* Items */}
            <div className="order-items">
              <p className="items-label">Items ordered:</p>
              {order.items.map((item, index) => (
                <p key={index} className="order-item">
                  {item.name} x{item.quantity}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="order-divider" />

            {/* Total */}
            <div className="order-total">
              <span>Total</span>
              <span>N {order.total}</span>
            </div>

            {/* Status */}
            <div className="order-status-row">
              <span>Order Status</span>
              <span className="status-delivered">
                {order.status}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#E9B118" strokeWidth="2"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="#E9B118" strokeWidth="2"/>
                </svg>
              </span>
            </div>

            {/* Reorder Button */}
            <div className="reorder-row">
              <button className="reorder-btn" onClick={() => navigate("/products")}>
                Re-Order
              </button>
            </div>

          </div>
        ))}

      </div>
    </PageLayout>
  );
}

export default OrderHistoryPage;