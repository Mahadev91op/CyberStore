"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, ChevronDown, User, LogOut } from 'lucide-react'; // LogOut icon add kiya
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // 🔥 Import Auth Hook

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth(); // 🔥 Get User Data

  return (
    <>
      {/* Top Strip */}
      <div className="bg-red-600 text-white text-xs py-1 px-4 text-center md:text-right font-medium">
        📞 Order on Call: +91-9876543210 | 🇮🇳 Shipping Pan India
      </div>

      <header className="bg-[#111] text-white sticky top-0 z-50 shadow-lg border-b border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-black tracking-tighter flex items-center">
            DEV<span className="text-red-600">SAMP</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <input 
              type="text" 
              placeholder="Search for RTX 4090, i9 Processor..." 
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-5 focus:outline-none focus:border-red-500 transition"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
              <Search size={18} />
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            
            {/* 🔥 USER SECTION START */}
            {user ? (
              // अगर यूजर लॉगिन है
              <div className="hidden md:flex items-center gap-3 group relative cursor-pointer">
                <div className="text-right leading-none">
                  <span className="block text-xs text-gray-400">Hello,</span>
                  <span className="block font-bold text-white">{user.name}</span>
                </div>
                <div className="bg-gray-800 p-2 rounded-full border border-gray-600">
                  <User size={20} />
                </div>
                
                {/* Dropdown for Logout */}
                <div className="absolute top-full right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-xl py-2 hidden group-hover:block border border-gray-200">
                  <div className="px-4 py-2 text-sm font-bold border-b border-gray-100">{user.email}</div>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              // अगर यूजर लॉगिन नहीं है
              <Link href="/login" className="hidden md:flex flex-col text-right text-xs leading-none cursor-pointer group">
                <span className="text-gray-400 group-hover:text-gray-300">Welcome</span>
                <span className="font-bold group-hover:text-red-500 transition">Login / Sign Up</span>
              </Link>
            )}
            {/* 🔥 USER SECTION END */}
            
            <Link href="/cart" className="relative hover:text-red-500 transition">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>

        {/* Desktop Menu & Mobile Menu - बाकी का कोड सेम रहेगा */}
        {/* ... (आपका पुराना Desktop Menu और Mobile Menu का कोड यहाँ रहने दें) ... */}
        
        {/* Mobile Menu Update (ताकि मोबाइल में भी Logout दिखे) */}
        {isMobileMenuOpen && (
             <div className="md:hidden bg-[#111] border-t border-gray-800 p-4 space-y-4">
                <ul className="space-y-3 text-gray-300">
                    <li><Link href="/" className="block">Home</Link></li>
                    <li><Link href="/pc-builder" className="block text-red-500 font-bold">Custom PC Build</Link></li>
                    <li><Link href="/category/processor" className="block">Processors</Link></li>
                    
                    {user ? (
                      <>
                        <li className="text-white font-bold border-t border-gray-700 pt-3">Hi, {user.name}</li>
                        <li><button onClick={logout} className="text-red-500 text-sm">Logout</button></li>
                      </>
                    ) : (
                      <li><Link href="/login" className="block border-t border-gray-700 pt-3 text-red-400 font-bold">Login / Signup</Link></li>
                    )}
                </ul>
             </div>
        )}
      </header>
    </>
  );
};

export default Navbar;