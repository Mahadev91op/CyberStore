"use client";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext'; // 🔥 Import Hook
import { useState } from 'react';

export default function AddToCartBtn({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    
    // थोड़ा एनिमेशन इफेक्ट के लिए
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className={`flex-1 font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg ${
        isAdded 
          ? "bg-green-600 text-white" 
          : "bg-red-600 hover:bg-red-700 text-white"
      }`}
    >
      <ShoppingCart className="mr-2" size={20} /> 
      {isAdded ? "Added!" : "Add to Cart"}
    </button>
  );
}