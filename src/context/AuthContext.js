// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize registered users list
  const getInitialUsers = () => {
    const stored = localStorage.getItem("oya_registered_users");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // Fallback
      }
    }
    // Seed default admin
    const defaultUsers = [
      {
        name: "System Admin",
        email: "admin@oyadeliver.com",
        password: "admin",
        role: "admin",
        phone: "08012345678",
        address: "Admin Headquarters"
      }
    ];
    localStorage.setItem("oya_registered_users", JSON.stringify(defaultUsers));
    return defaultUsers;
  };

  const [registeredUsers, setRegisteredUsers] = useState(getInitialUsers);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("oya_isLoggedIn")) || false;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("oya_user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        // Fallback
      }
    }
    return {
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "user"
    };
  });

  const login = (email, password) => {
    const found = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      setIsLoggedIn(true);
      setUser(found);
      localStorage.setItem("oya_isLoggedIn", "true");
      localStorage.setItem("oya_user", JSON.stringify(found));
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const signup = (name, email, password) => {
    const exists = registeredUsers.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      return { success: false, message: "Email is already registered" };
    }

    const newUser = {
      name,
      email,
      password,
      role: "user",
      phone: "",
      address: ""
    };

    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    localStorage.setItem("oya_registered_users", JSON.stringify(updated));

    // Auto login
    setIsLoggedIn(true);
    setUser(newUser);
    localStorage.setItem("oya_isLoggedIn", "true");
    localStorage.setItem("oya_user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({ name: "", email: "", phone: "", address: "", role: "user" });
    localStorage.setItem("oya_isLoggedIn", "false");
    localStorage.removeItem("oya_user");
  };

  const updateUser = (userData) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...userData };
      localStorage.setItem("oya_user", JSON.stringify(updatedUser));

      // Update in registeredUsers list as well
      const updatedList = registeredUsers.map((u) =>
        u.email.toLowerCase() === prev.email.toLowerCase() ? { ...u, ...userData } : u
      );
      setRegisteredUsers(updatedList);
      localStorage.setItem("oya_registered_users", JSON.stringify(updatedList));

      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}