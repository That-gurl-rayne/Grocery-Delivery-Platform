// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("oya_cartItems");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // Fallback
      }
    }
    return [];
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    const stored = localStorage.getItem("oya_orderHistory");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // Fallback
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("oya_cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("oya_orderHistory", JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const decreaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const increaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const placeOrder = (address, customTotal) => {
    const orderId = Math.floor(Math.random() * 9000) + 1000;
    const order = {
      id: orderId,
      date: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }),
      items: [...cartItems],
      total: customTotal || (cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 500),
      address: address || "Not provided",
      status: "Processing",
    };
    
    setOrderHistory(prev => [order, ...prev]);
    setCartItems([]);
    localStorage.setItem("oya_latest_order_id", orderId.toString());
    return orderId;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrderHistory(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      orderHistory,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      increaseQuantity,
      placeOrder,
      updateOrderStatus,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}