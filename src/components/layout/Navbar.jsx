"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, User, LogOut, Cpu, ChevronDown } from 'lucide-react'; 
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  // Categories List (Jo Dropdown me dikhegi)
  const categories = [
    { name: "Processors", slug: "processor" },
    { name: "Motherboards", slug: "motherboard" },
    { name: "Graphics Cards", slug: "graphics-card" },
    { name: "RAM (Memory)", slug: "ram" },
    { name: "Storage (SSD/HDD)", slug: "storage" },
    { name: "Power Supply", slug: "power-supply" },
    { name: "Cabinets", slug: "cabinet" },
    { name: "Monitors", slug: "monitor" },
  ];

  return (
    <>
      {/* 1. Top Premium Strip */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white/90 text-[11px] font-semibold tracking-wider py-1.5 px-4 text-center md:text-right uppercase">
        ⚡ Free Shipping on Orders Over ₹50,000 | 📞 24/7 Support: +91-9876543210
      </div>

      {/* 2. Main Glassmorphism Header */}
      <header className="bg-[#050505]/90 backdrop-blur-md text-white sticky top-0 z-50 border-b border-white/10 shadow-xl">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-6">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="bg-red-600 text-white h-8 w-8 flex items-center justify-center rounded font-black text-lg group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-red-900/50">C</div>
            <span className="text-2xl font-black tracking-tighter">
              CYBER<span className="text-red-500 group-hover:text-red-400 transition">STORE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-white transition relative group py-2">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* 🔥 Categories Dropdown */}
            <div className="relative group py-4 z-50">
                <button className="group-hover:text-white transition flex items-center gap-1 cursor-pointer">
                    Categories <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300"/>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-64 bg-[#111] border border-gray-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-4 group-hover:translate-y-0 p-2 flex flex-col gap-1">
                    {categories.map((cat) => (
                      <Link 
                        key={cat.slug} 
                        href={`/category/${cat.slug}`} 
                        className="block px-4 py-2.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition flex items-center justify-between group/item"
                      >
                        {cat.name}
                        <span className="text-red-500 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all">›</span>
                      </Link>
                    ))}
                </div>
            </div>

            {/* Custom Build Button */}
            <Link href="/pc-builder" className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
              <div className="relative flex items-center gap-2 bg-black rounded-full px-5 py-2 leading-none group-hover:bg-gray-900 transition">
                <Cpu size={16} className="text-red-500" />
                <span className="text-white font-bold tracking-wide">Custom Build</span>
              </div>
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative group">
            <input 
              type="text" 
              placeholder="Search for RTX 4090, Core i9..." 
              className="w-full bg-white/5 text-white border border-white/10 rounded-full py-2.5 px-5 text-sm focus:outline-none focus:border-red-500 focus:bg-black/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-gray-600"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 hover:text-white transition">
              <Search size={18} />
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            
            {/* User Profile */}
            {user ? (
              <div className="hidden md:flex items-center gap-3 group relative cursor-pointer py-4 z-50">
                <div className="text-right hidden xl:block">
                  <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold">Account</span>
                  <span className="block text-sm font-bold text-white">{user.name.split(' ')[0]}</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-full border border-gray-700 flex items-center justify-center text-red-500 shadow-lg group-hover:border-red-500 transition-all">
                  <User size={20} />
                </div>
                
                {/* User Dropdown */}
                <div className="absolute top-full right-0 w-60 bg-[#111] border border-gray-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-4 group-hover:translate-y-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/10 bg-white/5">
                        <p className="text-sm text-white font-bold">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button 
                        onClick={logout}
                        className="w-full text-left px-5 py-3 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white transition hover:bg-white/5 px-3 py-2 rounded-lg">
                <User size={18} />
                <span>Login</span>
              </Link>
            )}
            
            {/* Cart */}
            <Link href="/cart" className="relative group">
              <div className="p-2 hover:bg-white/10 rounded-full transition">
                <ShoppingCart size={24} className="group-hover:text-red-500 transition" />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-[#050505] shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Toggle */}
            <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28}/> : <Menu size={28}/>}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
             <div className="lg:hidden bg-[#050505]/95 backdrop-blur-xl border-t border-gray-800 absolute w-full left-0 shadow-2xl h-[calc(100vh-80px)] z-50 p-6 overflow-y-auto">
                
                <div className="mb-6 relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full bg-white/10 text-white border border-gray-700 rounded-xl py-3 px-5 focus:outline-none focus:border-red-500 transition"
                  />
                  <Search size={20} className="absolute right-4 top-3.5 text-gray-400"/>
                </div>

                <ul className="space-y-2">
                    <li><Link href="/" className="block p-3 rounded-xl hover:bg-white/5 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                    
                    <li>
                        <Link href="/pc-builder" className="block p-3 rounded-xl bg-gradient-to-r from-red-900/20 to-transparent border border-red-900/30 text-red-400 font-bold flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                            <Cpu size={20}/> Custom PC Build
                        </Link>
                    </li>

                    <li className="pt-4 pb-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-t border-gray-800 mt-4">Shop by Category</li>
                    
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link 
                          href={`/category/${cat.slug}`} 
                          className="block p-3 rounded-xl hover:bg-white/5 text-gray-300 flex justify-between items-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {cat.name}
                          <span className="text-gray-600">→</span>
                        </Link>
                      </li>
                    ))}
                    
                    {user ? (
                      <div className="mt-8 pt-6 border-t border-gray-800">
                        <div className="flex items-center gap-4 mb-4 bg-white/5 p-4 rounded-xl">
                          <div className="bg-gray-800 p-2 rounded-full"><User size={24} /></div>
                          <div>
                            <span className="block text-white font-bold text-lg">{user.name}</span>
                            <span className="block text-xs text-gray-400">{user.email}</span>
                          </div>
                        </div>
                        <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full py-3 rounded-xl bg-red-900/20 text-red-500 border border-red-900/30 font-bold flex items-center justify-center gap-2">
                          <LogOut size={18}/> Logout
                        </button>
                      </div>
                    ) : (
                      <div className="mt-8 pt-6 border-t border-gray-800 grid grid-cols-2 gap-4">
                          <Link href="/login" className="text-center py-3 rounded-xl bg-white/10 text-white font-bold" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                          <Link href="/signup" className="text-center py-3 rounded-xl bg-red-600 text-white font-bold" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                      </div>
                    )}
                </ul>
             </div>
        )}
      </header>
    </>
  );
};

export default Navbar;