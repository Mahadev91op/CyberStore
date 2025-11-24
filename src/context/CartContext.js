"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 1. Load Cart from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cyberstore_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Cart parse error", e);
      }
    }
  }, []);

  // 2. Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("cyberstore_cart", JSON.stringify(cart));
  }, [cart]);

  // --- ACTIONS ---

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id === productId) {
          const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
          if (newQty < 1) return item;
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  // 🔥 NEW: Clear Cart Function
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cyberstore_cart");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cart.reduce(
    (acc, item) => acc + (item.discountPrice || item.price) * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart, // ✅ इसे यहाँ पास करना बहुत ज़रूरी है
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);