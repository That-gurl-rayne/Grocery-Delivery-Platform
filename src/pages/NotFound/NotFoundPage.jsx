// src/pages/NotFound/NotFoundPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import "./NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="notfound-page">
        <h1 className="notfound-number">404</h1>
        <p className="notfound-text">Page not found</p>
        <button className="notfound-btn" onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    </PageLayout>
  );
}

export default NotFoundPage;