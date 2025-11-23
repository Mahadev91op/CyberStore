"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 1. पेज लोड होने पर LocalStorage से कार्ट वापस लाओ
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

  // 2. जब भी कार्ट बदले, उसे LocalStorage में सेव करो
  useEffect(() => {
    localStorage.setItem("cyberstore_cart", JSON.stringify(cart));
  }, [cart]);

  // --- ACTIONS ---

  // Add to Cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        // अगर पहले से है, तो Quantity बढ़ा दो
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        // नया आइटम जोड़ो (qty: 1 के साथ)
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  // Remove Item
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  // Update Quantity (+/-)
  const updateQuantity = (productId, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id === productId) {
          const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
          if (newQty < 1) return item; // 1 से कम नहीं होने देंगे
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  // Cart Totals Calculation
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
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook ताकि हम आसानी से useCart() कर सकें
export const useCart = () => useContext(CartContext);