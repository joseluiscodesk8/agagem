import React, { createContext, useContext, useState, useEffect } from 'react';


const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Recuperar elementos del carrito desde localStorage al cargar la página
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  

  const addToCart = (item) => {
    if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
      const updatedCart = [...cartItems, item];
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
  };
  


  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, cartCount, loggedInUser, setLoggedInUser }}>
      {children}
    </CartContext.Provider>
  );
  
}