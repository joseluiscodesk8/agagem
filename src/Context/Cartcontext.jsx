import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const addToCart = (item) => {
    if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount, loggedInUser, setLoggedInUser }}>
      {children}
    </CartContext.Provider>
  );
  
}