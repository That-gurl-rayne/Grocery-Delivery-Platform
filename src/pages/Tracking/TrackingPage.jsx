// src/pages/Tracking/TrackingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import TrackingBar from "../../components/tracking/TrackingBar";
import OrderCard from "../../components/tracking/OrderCard";
import { useCart } from "../../context/CartContext";
import "./TrackingPage.css";

function TrackingPage() {
  const navigate = useNavigate();
  const { orderHistory } = useCart();

  const latestOrder = orderHistory[0];

  const orderDate = new Date().toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  const getStep = (status) => {
    if (status === "Processing") return 1;
    if (status === "Out for Delivery") return 2;
    if (status === "Delivered") return 3;
    return 1;
  };

  return (
    <PageLayout>
      <div className="tracking-page">

        <button className="back-btn" onClick={() => navigate(-1)}>←</button>

        <div className="order-header">
          <h1>Order <span className="order-number">
            {latestOrder ? latestOrder.id : "1234"}
          </span></h1>
          <div className="order-date-pill">
            Ordered on {latestOrder ? latestOrder.date : orderDate}
          </div>
        </div>

        <TrackingBar currentStep={latestOrder ? getStep(latestOrder.status) : 1} />

        <OrderCard
          orderNumber={latestOrder ? latestOrder.id : "1234"}
          items={latestOrder ? latestOrder.items : []}
          deliveryFee={500}
          address={latestOrder ? latestOrder.address : "Your delivery address"}
          estimatedArrival={
            latestOrder && latestOrder.status === "Delivered"
              ? "Your order has been delivered! Enjoy your meal."
              : latestOrder && latestOrder.status === "Out for Delivery"
              ? "Order is out for delivery! Expect it in 5-10 minutes."
              : "Delivery Expected to arrive in 30-45 minutes"
          }
        />

      </div>
    </PageLayout>
  );
}

export default TrackingPage;