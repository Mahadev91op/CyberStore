"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, CreditCard } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  // Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white relative overflow-hidden px-4">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="bg-[#111]/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-md w-full border border-white/10 text-center relative z-10">
          <div className="bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 animate-pulse">
            <ShoppingBag size={48} className="text-white/20" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8 text-sm">Looks like you haven't added any PC parts yet.</p>
          <Link
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl w-full block transition-all transform hover:scale-[1.02] shadow-lg shadow-red-900/20"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 relative selection:bg-red-500 selection:text-white">
        
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <h1 className="text-4xl font-black text-white mb-8 flex items-center gap-4">
          Shopping Cart <span className="text-lg font-medium text-gray-500 bg-white/10 px-3 py-1 rounded-full border border-white/5">{cart.length} items</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT: CART ITEMS LIST --- */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="bg-[#111] p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-6 transition-all hover:border-white/20 group hover:bg-[#151515]">
                
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-[#1a1a1a] rounded-xl p-2 border border-white/5 flex items-center justify-center">
                  <Image
                    src={item.images?.[0] || "https://placehold.co/400"}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="object-contain max-h-full group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left w-full">
                  <Link href={`/product/${item._id}`} className="hover:text-red-500 transition block mb-1">
                    <h3 className="text-lg font-bold text-white line-clamp-1">{item.name}</h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-4 capitalize flex items-center justify-center sm:justify-start gap-2">
                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">{item.category}</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">{item.brand}</span>
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4">
                    
                    {/* Price */}
                    <div className="text-left">
                      <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Price</span>
                      <span className="text-xl font-bold text-white">
                        ₹{(item.discountPrice || item.price).toLocaleString()}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-[#1a1a1a] rounded-lg p-1 border border-white/10">
                      <button 
                        onClick={() => updateQuantity(item._id, "dec")}
                        className="w-8 h-8 flex items-center justify-center bg-[#222] rounded-md text-gray-400 hover:text-white hover:bg-red-600 disabled:opacity-50 transition"
                        disabled={item.qty <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-bold text-white text-sm">{item.qty}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, "inc")}
                        className="w-8 h-8 flex items-center justify-center bg-[#222] rounded-md text-gray-400 hover:text-white hover:bg-green-600 transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-gray-500 hover:text-red-500 p-2 transition bg-transparent hover:bg-red-500/10 rounded-full"
                  title="Remove Item"
                >
                  <Trash2 size={20} />
                </button>

              </div>
            ))}
          </div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] p-6 rounded-3xl border border-white/10 sticky top-24 shadow-2xl shadow-black/50">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Order Summary
              </h2>
              
              <div className="space-y-4 text-sm mb-6 text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-400 font-bold uppercase text-xs tracking-wider bg-green-400/10 px-2 py-0.5 rounded">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST)</span>
                  <span className="text-white font-medium">Included</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-white/10 my-6"></div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">Total</span>
                <span className="text-4xl font-black text-white tracking-tight">₹{cartTotal.toLocaleString()}</span>
              </div>

              <button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                Checkout Now <ArrowRight size={20} />
              </button>

              <div className="mt-6 grid grid-cols-2 gap-4">
                 <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                    <ShieldCheck className="text-green-500 mb-1" size={20} />
                    <span className="text-[10px] text-gray-400 font-bold">Secure Payment</span>
                 </div>
                 <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                    <CreditCard className="text-blue-500 mb-1" size={20} />
                    <span className="text-[10px] text-gray-400 font-bold">EMI Available</span>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}