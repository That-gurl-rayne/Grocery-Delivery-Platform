// src/pages/Settings/SettingsPage.jsx
import React, { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { useAuth } from "../../context/AuthContext";
import "./SettingsPage.css";

function SettingsPage() {
  const { isLoggedIn, user, logout } = useAuth();
  
  // Notification states
  const [pushNotifs, setPushNotifs] = useState(() => {
    const stored = localStorage.getItem("oya_push_notifs");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const [emailNotifs, setEmailNotifs] = useState(() => {
    const stored = localStorage.getItem("oya_email_notifs");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const [smsNotifs, setSmsNotifs] = useState(() => {
    const stored = localStorage.getItem("oya_sms_notifs");
    return stored !== null ? JSON.parse(stored) : false;
  });

  
  // Save changes
  const saveNotifConfig = (key, val, setter) => {
    setter(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  const handleClearCache = () => {
    if (window.confirm("Are you sure you want to clear all data? This will empty your cart, reset custom products, delete order histories, and log you out.")) {
      logout();
      localStorage.clear();
      document.body.classList.remove("dark-theme");
      window.location.href = "/";
    }
  };

  return (
    <PageLayout>
      <div className="settings-page">
        <h1 className="settings-title">App <span className="highlight">Settings</span></h1>
        

        {/* Notifications Settings */}
        <div className="settings-card">
          <h2>🔔 Notifications & Alerts</h2>
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Order Dispatch Alerts</span>
              <span className="setting-desc">Receive real-time push alerts on delivery updates.</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={pushNotifs}
                onChange={(e) => saveNotifConfig("oya_push_notifs", e.target.checked, setPushNotifs)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Email Order Invoices</span>
              <span className="setting-desc">Get a digital receipt copy in your inbox.</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => saveNotifConfig("oya_email_notifs", e.target.checked, setEmailNotifs)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">SMS Dispatch Details</span>
              <span className="setting-desc">Get SMS messages when the driver departs.</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={smsNotifs}
                onChange={(e) => saveNotifConfig("oya_sms_notifs", e.target.checked, setSmsNotifs)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Account Defaults Summary */}
        <div className="settings-card">
          <h2>👤 Account Summary</h2>
          {isLoggedIn ? (
            <div className="account-summary-details">
              <div className="summary-info-row">
                <strong>Name:</strong>
                <span>{user.name}</span>
              </div>
              <div className="summary-info-row">
                <strong>Email:</strong>
                <span>{user.email}</span>
              </div>
              <div className="summary-info-row">
                <strong>Account Type:</strong>
                <span className={`role-badge ${user.role}`}>{user.role === "admin" ? "🛠️ System Administrator" : "🛒 Standard Customer"}</span>
              </div>
            </div>
          ) : (
            <p className="no-account-notice">
              You are currently using Oya Deliver as a guest. 
              <a href="/login" style={{ color: "#E9B118", marginLeft: "5px", fontWeight: "600", textDecoration: "none" }}>Log in / Register</a> to save profile settings.
            </p>
          )}
        </div>

        {/* Reset / Diagnostic Settings */}
        <div className="settings-card danger-card">
          <h2>⚠️ System Diagnostics</h2>
          <div className="setting-row danger-row">
            <div className="setting-info">
              <span className="setting-label text-danger">Reset All Application Storage</span>
              <span className="setting-desc text-danger">Clear all items in localStorage, empty your cart, reset products catalog, and log out.</span>
            </div>
            <button className="danger-btn" onClick={handleClearCache}>
              Clear Cache
            </button>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

export default SettingsPage;
