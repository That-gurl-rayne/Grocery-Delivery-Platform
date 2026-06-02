// src/pages/Contact/ContactPage.jsx
import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import "./ContactPage.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      setError("Please fill in all the fields.");
      return;
    }

    // Basic email check
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Mock API request lag
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Store submission in localStorage
      const existing = localStorage.getItem("oya_contact_messages");
      const messages = existing ? JSON.parse(existing) : [];
      const newMsg = {
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleString()
      };
      localStorage.setItem("oya_contact_messages", JSON.stringify([...messages, newMsg]));
      
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <PageLayout>
      <div className="contact-page">
        <h1 className="contact-title">Get in <span className="highlight">Touch</span></h1>
        <p className="contact-subtitle">Have questions or feedback? We'd love to hear from you.</p>

        <div className="contact-container">
          {/* Contact Details Card */}
          <div className="contact-details">
            <div className="detail-card">
              <h3>📍 Headquarters</h3>
              <p>12 Oya Deliver Lane, Herbert Macaulay Way, Yaba, Lagos, Nigeria.</p>
            </div>
            
            <div className="detail-card">
              <h3>📞 Telephone & Email</h3>
              <p><strong>Hotline:</strong> +234 801 234 5678</p>
              <p><strong>Email:</strong> support@oyadeliver.com</p>
            </div>

            <div className="detail-card">
              <h3>🕒 Dispatch Hours</h3>
              <p>Monday - Saturday: 7:00 AM - 10:00 PM</p>
              <p>Sunday: 9:00 AM - 8:00 PM</p>
            </div>

            {/* Mock Map Frame */}
            <div className="map-mock">
              <div className="map-placeholder">
                <span className="pin">📍</span>
                <p>Interactive Map Mockup (Yaba, Lagos)</p>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="contact-form-card">
            <h2>Send Us a Message</h2>

            {error && <div className="error-alert">{error}</div>}
            
            {success && (
              <div className="success-alert">
                <span>✓ Message Sent Successfully!</span>
                <p>We will review your inquiry and get back to you shortly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="contact-name">Full Name</label>
                <input
                  type="text"
                  id="contact-name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  placeholder="Inquiry subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <div className="loader"></div>
                ) : (
                  "Send Message →"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ContactPage;
