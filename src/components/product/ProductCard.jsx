"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Check, Zap, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation on button click
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group relative bg-[#111] rounded-2xl border border-white/10 overflow-hidden hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/20 flex flex-col h-full">
      {/* New, More Visible Sale Badge */}
      {product.discountPrice > 0 && (
        <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-black tracking-wide px-2.5 py-1.5 rounded-lg shadow-[0_4px_12px_rgba(220,38,38,0.5)] border border-red-500/30 flex items-center gap-1 backdrop-blur-sm">
          <Zap size={12} fill="currentColor" className="text-yellow-300" />
          {(100 - (product.discountPrice / product.price) * 100).toFixed(0)}%
          OFF
        </div>
      )}

      <Link href={`/product/${product._id}`} className="block relative flex-1">
        {/* Image Area with Glow */}
        <div className="relative h-64 w-full bg-gradient-to-b from-[#1a1a1a] to-[#111] p-6 flex items-center justify-center overflow-hidden">
          {/* Background Glow on Hover */}
          <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

          <Image
            src={product.images[0] || "https://placehold.co/400"}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110 z-10 relative drop-shadow-xl"
          />

          {/* 'View Details' Badge on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <span className="bg-black/80 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 border border-white/10 transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <Eye size={14} /> View Details
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center text-yellow-500 text-[11px] gap-1 font-medium">
              <Star size={12} fill="currentColor" /> 4.8
            </div>
          </div>

          <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 mb-3 group-hover:text-red-500 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            In Stock & Ready to Ship
          </p>
        </div>
      </Link>

      {/* Footer: Price & Action */}
      <div className="px-5 pb-5 mt-auto">
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex flex-col">
            {product.discountPrice > 0 && (
              <span className="text-xs text-gray-500 line-through">
                ₹{product.price.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-black text-white tracking-tight">
              ₹{(product.discountPrice || product.price).toLocaleString()}
            </span>
          </div>

          {/* Stylish Add Button */}
          <button
            onClick={handleAddToCart}
            className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
              isAdded
                ? "bg-green-500 text-white scale-110 rotate-3"
                : "bg-white text-black hover:bg-red-600 hover:text-white hover:scale-105 hover:-rotate-3"
            }`}
            title="Add to Cart"
          >
            {isAdded ? (
              <Check size={20} strokeWidth={3} />
            ) : (
              <ShoppingCart size={20} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
