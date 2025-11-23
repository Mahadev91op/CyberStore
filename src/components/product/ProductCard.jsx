"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext'; // 🔥 Import Context
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // 🔥 Use Hook
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // लिंक पर क्लिक होने से रोकें
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500); // 1.5 सेकंड बाद वापस नॉर्मल
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
      
      <Link href={`/product/${product._id}`} className="block flex-grow">
        {/* Image Section */}
        <div className="relative h-64 w-full bg-gray-50 p-6 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
          <Image
            src={product.images[0] || 'https://placehold.co/400'} 
            alt={product.name}
            fill
            className="object-contain hover:scale-110 transition-transform duration-500"
          />
          {product.discountPrice > 0 && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                  {(100 - (product.discountPrice / product.price * 100)).toFixed(0)}% OFF
              </span>
          )}
        </div>

        {/* Details Section */}
        <div className="p-4">
          <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">{product.category}</div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 h-[3.2rem] group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mt-2 mb-3">
              <div className="flex text-yellow-400">
                {[...Array(4)].map((_,i)=><Star key={i} size={14} fill="currentColor" />)}
                <Star size={14} className="text-gray-300" />
              </div>
              <span className="text-xs text-gray-400 ml-1">(4.0)</span>
          </div>
        </div>
      </Link>

      {/* Price & Button */}
      <div className="px-4 pb-4 mt-auto">
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              ₹{(product.discountPrice || product.price).toLocaleString()}
            </span>
            {product.discountPrice > 0 && (
                <span className="text-xs text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
            )}
          </div>
          
          {/* Animated Cart Button */}
          <button 
            onClick={handleAddToCart}
            className={`p-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
              isAdded 
                ? "bg-green-600 text-white scale-110" 
                : "bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white"
            }`}
            title="Add to Cart"
          >
            {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;