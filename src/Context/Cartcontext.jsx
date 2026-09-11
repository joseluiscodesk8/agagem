"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    try {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch {
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      const storedSession = localStorage.getItem("session");
      if (storedSession) {
        setLoggedInUser(JSON.parse(storedSession));
      }
    } catch {
      setLoggedInUser(null);
    }
  }, []);

  const addToCart = useCallback((item) => {
    setCartItems((prev) => {
      const next = [...prev];
      const existingIndex = next.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.origin === item.origin
      );

      if (existingIndex !== -1) {
        next[existingIndex].quantity += item.quantity;
      } else {
        next.push(item);
      }

      localStorage.setItem("cartItems", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromCart = useCallback((itemId, origin) => {
    setCartItems((prev) => {
      const next = prev.filter(
        (item) => !(item.id === itemId && item.origin === origin)
      );
      localStorage.setItem("cartItems", JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  }, []);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, loggedInUser, setLoggedInUser }}
    >
      {children}
    </CartContext.Provider>
  );
};