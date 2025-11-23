"use client";
import { ShoppingCart } from 'lucide-react';

export default function AddToCartBtn({ product }) {
  const handleAddToCart = () => {
    // यहाँ बाद में हम Context API या Redux का लॉजिक लिखेंगे
    alert(`Added ${product.name} to cart!`); 
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition transform hover:scale-[1.02]"
    >
      <ShoppingCart className="mr-2" size={20} /> Add to Cart
    </button>
  );
}