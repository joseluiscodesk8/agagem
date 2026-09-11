"use client";

import { useSyncExternalStore } from "react";
import { cartStore } from "./cartStore";

export function useCart() {
  const state = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );

  return {
    cartItems: state.cartItems,
    cartCount: state.cartCount,
    loggedInUser: state.loggedInUser,
    addToCart: cartStore.addToCart,
    removeFromCart: cartStore.removeFromCart,
    clearCart: cartStore.clearCart,
    setLoggedInUser: cartStore.setLoggedInUser,
  };
}