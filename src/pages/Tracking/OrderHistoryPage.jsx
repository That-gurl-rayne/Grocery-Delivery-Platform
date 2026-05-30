import React from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { useCart } from "../../context/CartContext";
import "./OrderHistoryPage.css";

function OrderHistoryPage() {
  const navigate = useNavigate();
  const { orderHistory } = useCart();

  return (
    <PageLayout>
      <div className="order-history-page">

        <button className="back-btn" onClick={() => navigate(-1)}>←</button>

        <h1 className="history-title">
          Order <span className="history-highlight">History</span>
        </h1>

        {orderHistory.length === 0 ? (
          <div className="empty-history">
            <p>No orders yet!</p>
            <button className="shop-btn" onClick={() => navigate("/products")}>
              Start Shopping
            </button>
          </div>
        ) : (
          orderHistory.map((order) => (
            <div key={order.id} className="order-card">

              <button className="order-number-pill">Order {order.id}</button>

              <div className="order-date-pill">
                Ordered on {order.date}
              </div>

              <div className="order-items">
                <p className="items-label">Items ordered:</p>
                {order.items.map((item, index) => (
                  <p key={index} className="order-item">
                    {item.name} x{item.quantity}
                  </p>
                ))}
              </div>

              <div className="order-divider" />

              <div className="order-total">
                <span>Total</span>
                <span>N {order.total}</span>
              </div>

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

              <div className="reorder-row">
                <button className="reorder-btn" onClick={() => navigate("/products")}>
                  Re-Order
                </button>
              </div>

            </div>
          ))
        )}

      </div>
    </PageLayout>
  );
}

export default OrderHistoryPage;