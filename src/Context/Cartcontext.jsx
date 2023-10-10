import React, { createContext, useContext, useState, useEffect } from 'react';


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
    // Recuperar elementos del carrito desde localStorage al cargar la página
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  

  const addToCart = (item) => {

    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.origin === item.origin
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, item];
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (itemId, itemOrigin) => {
    const updatedCart = cartItems.filter((item) => !(item.id === itemId && item.origin === itemOrigin));
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