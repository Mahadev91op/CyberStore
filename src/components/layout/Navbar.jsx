// src/components/layout/Navbar.js
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, ChevronDown, User } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Strip (Contact Info) */}
      <div className="bg-red-600 text-white text-xs py-1 px-4 text-center md:text-right font-medium">
        📞 Order on Call: +91-9876543210 | 🇮🇳 Shipping Pan India
      </div>

      <header className="bg-[#111] text-white sticky top-0 z-50 shadow-lg border-b border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* 1. Logo */}
          <Link href="/" className="text-2xl font-black tracking-tighter flex items-center">
            DEV<span className="text-red-600">SAMP</span>
          </Link>

          {/* 2. Search Bar (Hidden on Mobile) */}
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

          {/* 3. Right Icons */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col text-right text-xs leading-none">
              <span className="text-gray-400">Welcome</span>
              <span className="font-bold hover:text-red-500 cursor-pointer">Login / Sign Up</span>
            </div>
            
            <Link href="/cart" className="relative hover:text-red-500 transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">0</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>

        {/* 4. Desktop Navigation Menu (Techpc7 Style) */}
        <div className="hidden md:block bg-[#1a1a1a] border-t border-gray-800">
            <div className="container mx-auto px-4">
                <ul className="flex space-x-8 text-sm font-medium py-3 text-gray-300">
                    <li><Link href="/" className="hover:text-red-500 uppercase">Home</Link></li>
                    
                    {/* Processor Dropdown */}
                    <li className="group relative cursor-pointer hover:text-red-500 uppercase flex items-center">
                        Processors <ChevronDown size={14} className="ml-1"/>
                        <div className="absolute hidden group-hover:block top-full left-0 w-48 bg-white text-gray-900 shadow-xl rounded-b-lg z-50 py-2">
                            <Link href="/category/processor?brand=intel" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 border-b">Intel Processors</Link>
                            <Link href="/category/processor?brand=amd" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">AMD Processors</Link>
                        </div>
                    </li>

                    {/* Motherboard Dropdown */}
                    <li className="group relative cursor-pointer hover:text-red-500 uppercase flex items-center">
                        Motherboards <ChevronDown size={14} className="ml-1"/>
                         <div className="absolute hidden group-hover:block top-full left-0 w-48 bg-white text-gray-900 shadow-xl rounded-b-lg z-50 py-2">
                            <Link href="/category/motherboard?brand=intel" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 border-b">Intel Chipset</Link>
                            <Link href="/category/motherboard?brand=amd" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">AMD Socket</Link>
                        </div>
                    </li>
                    
                    <li><Link href="/category/graphics-card" className="hover:text-red-500 uppercase">Graphics Cards</Link></li>
                    <li><Link href="/pc-builder" className="text-red-500 font-bold uppercase animate-pulse">Custom PC Build</Link></li>
                </ul>
            </div>
        </div>

        {/* 5. Mobile Menu (Drawer) */}
        {isMobileMenuOpen && (
             <div className="md:hidden bg-[#111] border-t border-gray-800 p-4 space-y-4">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2"
                />
                <ul className="space-y-3 text-gray-300">
                    <li><Link href="/" className="block">Home</Link></li>
                    <li><Link href="/pc-builder" className="block text-red-500 font-bold">Custom PC Build</Link></li>
                    <li><Link href="/category/processor" className="block">Processors</Link></li>
                    <li><Link href="/login" className="block border-t border-gray-700 pt-3">Login / Signup</Link></li>
                </ul>
             </div>
        )}
      </header>
    </>
  );
};

export default Navbar;