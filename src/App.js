import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ProductsPage from "./pages/Products/ProductsPage";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Payment/CheckoutPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import TrackingPage from "./pages/Tracking/TrackingPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import OrderHistoryPage from "./pages/Tracking/OrderHistoryPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import AdminPage from "./pages/Admin/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;