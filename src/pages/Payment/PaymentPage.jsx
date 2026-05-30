// src/pages/Payment/PaymentPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import "./PaymentPage.css";
import { useCart } from "../../context/CartContext";

function PaymentPage() {
  const navigate = useNavigate();
  const { cartItems, placeOrder } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paid, setPaid] = useState(false);

  const handlePay = () => {
    setPaid(true);
    placeOrder();
   setTimeout(() => {
  navigate("/tracking");
}, 2000);
  };

  return (
    <PageLayout>
      <div className="payment-page">

        {/* Back button */}
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>

        <h1 className="payment-title">Payment</h1>

        {/* Payment Method */}
        <div className="payment-methods">
          <button
            className={`method-btn ${paymentMethod === "card" ? "active" : ""}`}
            onClick={() => setPaymentMethod("card")}
          >
            💳 Card
          </button>
          <button
            className={`method-btn ${paymentMethod === "transfer" ? "active" : ""}`}
            onClick={() => setPaymentMethod("transfer")}
          >
            🏦 Bank Transfer
          </button>
        </div>

        {/* Card Form */}
        {paymentMethod === "card" && (
          <div className="payment-form">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="payment-input"
                maxLength={19}
              />
            </div>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                placeholder="Enter name on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="payment-input"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="payment-input"
                  maxLength={5}
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  placeholder="•••"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="payment-input"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer */}
        {paymentMethod === "transfer" && (
          <div className="transfer-details">
            <div className="transfer-card">
              <p>Bank: <strong>First Bank</strong></p>
              <p>Account Number: <strong>1234567890</strong></p>
              <p>Account Name: <strong>Oya Deliver Ltd</strong></p>
              <p>Amount: <strong>N 6000</strong></p>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="payment-summary">
          <div className="summary-header">
            <h2>Total</h2>
          </div>
          <div className="summary-row">
            <span className="summary-pill">Subtotal</span>
            <span>N 5500</span>
          </div>
          <div className="summary-row">
            <span className="summary-pill">Delivery fee</span>
            <span>N 500</span>
          </div>
          <div className="summary-row">
            <span className="summary-pill grand">Grand Total</span>
            <span className="grand-total">N 6000</span>
          </div>
        </div>

        {/* Pay Button */}
    <button
  className={`pay-btn ${paid ? "paid" : ""}`}
  onClick={handlePay}
>
  {paid ? "Payment Confirmed! ✓" : (
    <>
      <span>Pay Now</span>
      <span>N 6000 </span>
    </>
  )}
</button>

      </div>
    </PageLayout>
  );
}

export default PaymentPage;