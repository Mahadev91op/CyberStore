"use client";
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function AddToCartBtn({ product }) {
  const { addToCart } = useCart();
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleAddToCart = () => {
    setStatus("loading");
    
    // Fake delay for smooth effect
    setTimeout(() => {
      addToCart(product);
      setStatus("success");
      
      // Reset after 2 seconds
      setTimeout(() => setStatus("idle"), 2000);
    }, 600);
  };

  return (
    <button 
      onClick={handleAddToCart}
      disabled={status !== "idle"}
      className={`
        relative overflow-hidden flex-1 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 shadow-lg group
        ${status === "success" 
          ? "bg-green-500 text-white shadow-green-500/25" 
          : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-600/25 hover:shadow-red-600/40"
        }
      `}
    >
      {/* Shine Effect Overlay */}
      {status === "idle" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
      )}

      <div className="relative flex items-center gap-2">
        {status === "idle" && <><ShoppingCart size={20} strokeWidth={2.5} /> Add to Cart</>}
        {status === "loading" && <><Loader2 size={20} className="animate-spin" /> Adding...</>}
        {status === "success" && <><Check size={20} strokeWidth={3} /> Added!</>}
      </div>
    </button>
  );
}