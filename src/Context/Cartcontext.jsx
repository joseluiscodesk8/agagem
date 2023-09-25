import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // Verifica si el item ya existe en el carrito antes de agregarlo
    if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (itemId) => {
    // Elimina solo el primer elemento con el itemId proporcionado
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}