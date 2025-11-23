"use client";

// src/components/product/ProductCard.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // 🔥 यह लाइन बहुत जरुरी है
import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group flex flex-col">
      
      {/* 1. लिंक - इमेज और नाम पर क्लिक करने पर पेज खुलेगा */}
      <Link href={`/product/${product._id}`} className="block flex-grow">
        
        {/* Image Section */}
        <div className="relative h-64 w-full bg-gray-50 p-4 flex items-center justify-center group-hover:bg-gray-100 transition">
          <Image
            src={product.images[0] || 'https://placehold.co/400'} 
            alt={product.name}
            fill
            className="object-contain hover:scale-110 transition-transform duration-500"
          />
          {/* Discount Badge */}
          {product.discountPrice > 0 && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {(100 - (product.discountPrice / product.price * 100)).toFixed(0)}% OFF
              </span>
          )}
        </div>

        {/* Details Section */}
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 h-12 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating Mock */}
          <div className="flex items-center mt-2 mb-3">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <Star size={16} className="text-gray-300" />
              <span className="text-xs text-gray-400 ml-1">(4.0)</span>
          </div>
        </div>
      </Link>

      {/* 2. प्राइस और कार्ट बटन (लिंक के बाहर रखा है ताकि बटन अलग से काम करे) */}
      <div className="px-4 pb-4 mt-auto">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">₹{product.discountPrice?.toLocaleString() || product.price.toLocaleString()}</span>
            {product.discountPrice > 0 && (
                <span className="text-sm text-gray-400 line-through ml-2">₹{product.price.toLocaleString()}</span>
            )}
          </div>
          
          {/* यह बटन अभी सिर्फ अलर्ट दिखाएगा, पेज नहीं खोलेगा */}
          <button 
            onClick={(e) => {
                e.preventDefault(); // बटन दबाने पर प्रोडक्ट पेज न खुले
                alert("Added to cart!");
            }}
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition z-10 relative"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
