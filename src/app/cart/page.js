"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  // अगर कार्ट खाली है
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any PC parts yet.</p>
          <Link
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl w-full block transition transform hover:scale-[1.02]"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
          Shopping Cart <span className="ml-3 text-lg font-medium text-gray-500">({cart.length} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT: CART ITEMS LIST --- */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 transition hover:shadow-md">
                
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-50 rounded-xl p-2 border border-gray-200 flex items-center justify-center">
                  <Image
                    src={item.images?.[0] || "https://placehold.co/400"}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="object-contain max-h-full"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left w-full">
                  <Link href={`/product/${item._id}`} className="hover:text-red-600 transition">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-4 capitalize">{item.category} • {item.brand}</p>
                  
                  <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4">
                    
                    {/* Price */}
                    <div className="text-left">
                      <span className="block text-xs text-gray-400">Price</span>
                      <span className="text-xl font-bold text-gray-900">
                        ₹{(item.discountPrice || item.price).toLocaleString()}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item._id, "dec")}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-red-600 disabled:opacity-50 transition"
                        disabled={item.qty <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-semibold text-gray-900">{item.qty}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, "inc")}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-green-600 transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-gray-400 hover:text-red-500 p-2 transition bg-gray-50 hover:bg-red-50 rounded-full sm:bg-transparent sm:rounded-none"
                  title="Remove Item"
                >
                  <Trash2 size={20} />
                </button>

              </div>
            ))}
          </div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST)</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-gray-900 font-bold text-lg">Total</span>
                  <span className="text-3xl font-extrabold text-gray-900">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg">
                Checkout Now <ArrowRight size={20} />
              </button>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="text-green-600" size={16} />
                Safe & Secure Payments
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}