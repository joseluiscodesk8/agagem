const CART_KEY = "cartItems";
const SESSION_KEY = "session";

const EMPTY = Object.freeze({
  cartItems: [],
  cartCount: 0,
  loggedInUser: null,
});

const listeners = new Set();
let snapshot = EMPTY;

const totalCount = (items) =>
  items.reduce((sum, item) => sum + (item.quantity ?? 1), 0);

const readLocal = (key, fallback) => {
  try {
    const raw = typeof window !== "undefined" && window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeLocal = (key, value) => {
  if (typeof window === "undefined") return;
  if (value === null || value === undefined) {
    window.localStorage.removeItem(key);
  } else {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

if (typeof window !== "undefined") {
  const cartItems = readLocal(CART_KEY, []);
  snapshot = Object.freeze({
    cartItems,
    cartCount: totalCount(cartItems),
    loggedInUser: readLocal(SESSION_KEY, null),
  });
}

const commitCart = (cartItems) => {
  writeLocal(CART_KEY, cartItems);
  snapshot = Object.freeze({
    cartItems,
    cartCount: totalCount(cartItems),
    loggedInUser: snapshot.loggedInUser,
  });
  listeners.forEach((listener) => listener());
};

const commitSession = (user) => {
  writeLocal(SESSION_KEY, user);
  snapshot = Object.freeze({
    cartItems: snapshot.cartItems,
    cartCount: snapshot.cartCount,
    loggedInUser: user,
  });
  listeners.forEach((listener) => listener());
};

export const cartStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => snapshot,
  getServerSnapshot: () => EMPTY,

  addToCart(item) {
    const next = [...snapshot.cartItems];
    const index = next.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.origin === item.origin,
    );
    if (index !== -1) {
      next[index] = {
        ...next[index],
        quantity: (next[index].quantity ?? 1) + (item.quantity ?? 1),
      };
    } else {
      next.push(item);
    }
    commitCart(next);
  },

  removeFromCart(itemId, origin) {
    commitCart(
      snapshot.cartItems.filter(
        (item) => !(item.id === itemId && item.origin === origin),
      ),
    );
  },

  clearCart() {
    commitCart([]);
  },

  setLoggedInUser(user) {
    commitSession(user);
  },
};