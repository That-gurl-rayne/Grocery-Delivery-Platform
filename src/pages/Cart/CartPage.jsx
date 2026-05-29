// src/pages/Cart/CartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import CartItem from "../../components/Cart/CartItem";
import CartSummary from "../../components/Cart/CartSummary";
import { useCart } from "../../context/CartContext";
import "./CartPage.css";

function CartPage() {
  const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="cart-page">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h1 className="cart-title">Cart Items</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate("/products")} className="continue-btn">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
            <CartSummary items={cartItems} deliveryFee={500} />
          </>
        )}
      </div>
    </PageLayout>
  );
}

export default CartPage;