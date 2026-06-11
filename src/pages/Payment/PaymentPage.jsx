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
  const [error, setError] = useState("");
  const [transferConfirmed, setTransferConfirmed] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 500 : 0;
  const grandTotal = subtotal + deliveryFee;

  const validateCardPayment = () => {
    const digitsOnly = cardNumber.replace(/\s/g, "");
    if (digitsOnly.length < 16 || !/^\d+$/.test(digitsOnly)) {
      return "Please enter a valid 16-digit card number.";
    }
    if (!cardName.trim()) {
      return "Please enter the cardholder name.";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      return "Please enter a valid expiry date (MM/YY).";
    }
    if (!/^\d{3}$/.test(cvv)) {
      return "Please enter a valid 3-digit CVV.";
    }
    return "";
  };

  const handlePay = () => {
    setError("");

    if (paymentMethod === "card") {
      const validationError = validateCardPayment();
      if (validationError) {
        setError(validationError);
        return;
      }
    } else if (paymentMethod === "transfer") {
      if (!transferConfirmed) {
        setError("Please confirm that you have completed the bank transfer.");
        return;
      }
    }

    setPaid(true);
    const address = localStorage.getItem("oya_checkout_address") || "Default Address";
    placeOrder(address, grandTotal);
    setTimeout(() => {
      navigate("/tracking");
    }, 2000);
  };

  return (
    <PageLayout>
      <div className="payment-page">

        <button className="back-btn" onClick={() => navigate(-1)}>←</button>

        <h1 className="payment-title">Payment</h1>

        <div className="payment-methods">
          <button
            className={`method-btn ${paymentMethod === "card" ? "active" : ""}`}
            onClick={() => { setPaymentMethod("card"); setError(""); }}
          >
            💳 Card
          </button>
          <button
            className={`method-btn ${paymentMethod === "transfer" ? "active" : ""}`}
            onClick={() => { setPaymentMethod("transfer"); setError(""); }}
          >
            🏦 Bank Transfer
          </button>
        </div>

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

        {paymentMethod === "transfer" && (
          <div className="transfer-details">
            <div className="transfer-card">
              <p>Bank: <strong>First Bank</strong></p>
              <p>Account Number: <strong>1234567890</strong></p>
              <p>Account Name: <strong>Oya Deliver Ltd</strong></p>
              <p>Amount: <strong>N {grandTotal}</strong></p>
            </div>
            <label className="transfer-confirm">
              <input
                type="checkbox"
                checked={transferConfirmed}
                onChange={(e) => { setTransferConfirmed(e.target.checked); setError(""); }}
              />
              <span>I have completed this bank transfer</span>
            </label>
          </div>
        )}

        <div className="payment-summary">
          <div className="summary-header">
            <h2>Total</h2>
          </div>
          <div className="summary-row">
            <span className="summary-pill">Subtotal</span>
            <span>N {subtotal}</span>
          </div>
          <div className="summary-row">
            <span className="summary-pill">Delivery fee</span>
            <span>N {deliveryFee}</span>
          </div>
          <div className="summary-row">
            <span className="summary-pill grand">Grand Total</span>
            <span className="grand-total">N {grandTotal}</span>
          </div>
        </div>

        {error && (
          <div className="payment-error">
            {error}
          </div>
        )}

        <button
          className={`pay-btn ${paid ? "paid" : ""}`}
          onClick={handlePay}
          disabled={paid}
        >
          {paid ? "Payment Confirmed! ✓" : (
            <>
              <span>Pay Now</span>
              <span>N {grandTotal}</span>
            </>
          )}
        </button>

      </div>
    </PageLayout>
  );
}

export default PaymentPage;