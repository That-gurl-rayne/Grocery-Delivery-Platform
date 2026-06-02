// src/components/auth/LoginForm.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    const res = login(email, password);
    if (res.success) {
      navigate("/profile");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Login to your account</p>
        {error && <div className="auth-error" style={{ color: "#e74c3c", backgroundColor: "#fdeae8", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontSize: "14px", textAlign: "center" }}>{error}</div>}

        <div className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input password-input"
              />
              <button
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="#666" strokeWidth="2"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="#666" strokeWidth="2"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="#666" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#666" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="#666" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button className="auth-btn" onClick={handleSubmit}>
            Login
          </button>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;