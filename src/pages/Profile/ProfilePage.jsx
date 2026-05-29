import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { useAuth } from "../../context/AuthContext";
import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  return (
    <PageLayout>
      <div className="profile-page">

        {/* Profile Picture */}
        <div className="profile-avatar">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="60" fill="#D9D9D9"/>
            <circle cx="60" cy="45" r="20" fill="#FFFAF4"/>
            <ellipse cx="60" cy="95" rx="35" ry="25" fill="#FFFAF4"/>
          </svg>
        </div>

        {/* Name + Edit icon */}
        <div className="profile-name-row">
          <h2 className="profile-name">{user.name || "User"}</h2>
          <svg
            onClick={() => setIsEditing(!isEditing)}
            style={{ cursor: "pointer" }}
            width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#E9B118" strokeWidth="2"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#E9B118" strokeWidth="2"/>
          </svg>
        </div>

        {/* Email */}
        <p className="profile-email">{user.email || "No email"}</p>

        {/* Details */}
        <button className="details-btn">Details</button>

        {/* Edit Form or Display */}
        {isEditing ? (
          <div className="edit-form">
            <div className="edit-group">
              <label>Full Name</label>
              <input
                className="edit-input"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div className="edit-group">
              <label>Phone Number</label>
              <input
                className="edit-input"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div className="edit-group">
              <label>Address</label>
              <input
                className="edit-input"
                value={editData.address}
                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                placeholder="Enter address"
              />
            </div>
            <div className="edit-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="profile-details">
            <p>Full Name: {user.name || "Not set"}</p>
            <p>Phone Number: {user.phone || "Not set"}</p>
            <p>Address: {user.address || "Not set"}</p>
          </div>
        )}

        {/* Order History Button */}
        <button className="order-history-btn" onClick={() => navigate("/order-history")}>
          Order History
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#0F0F0F" strokeWidth="2"/>
            <path d="M12 6v6l4 2" stroke="#0F0F0F" strokeWidth="2"/>
          </svg>
        </button>

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="#FFFAF4" strokeWidth="2"/>
            <polyline points="16 17 21 12 16 7" stroke="#FFFAF4" strokeWidth="2"/>
            <line x1="21" y1="12" x2="9" y2="12" stroke="#FFFAF4" strokeWidth="2"/>
          </svg>
        </button>

      </div>
    </PageLayout>
  );
}

export default ProfilePage;