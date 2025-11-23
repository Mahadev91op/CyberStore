// src/components/layout/Footer.js
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight, Heart, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-gray-400 border-t border-white/10 relative overflow-hidden pt-16 pb-8">
      
      {/* Background Glow */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: About & Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
                <span className="text-3xl font-black tracking-tighter text-white">
                DEV<span className="text-red-600">SAMP</span>
                </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              India's premier destination for extreme gaming rigs, workstations, and enthusiast components. Built by gamers, for gamers.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                <a 
                    key={idx} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 group"
                >
                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs border-l-2 border-red-600 pl-3">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/pc-builder" className="hover:text-red-500 transition flex items-center gap-2"><ArrowRight size={14} /> Custom PC Builder</Link></li>
              <li><Link href="/category/processor" className="hover:text-red-500 transition flex items-center gap-2"><ArrowRight size={14} /> Processors</Link></li>
              <li><Link href="/category/graphics-card" className="hover:text-red-500 transition flex items-center gap-2"><ArrowRight size={14} /> Graphics Cards</Link></li>
              <li><Link href="/category/monitor" className="hover:text-red-500 transition flex items-center gap-2"><ArrowRight size={14} /> Gaming Monitors</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs border-l-2 border-red-600 pl-3">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-red-500 transition flex items-center gap-2"><ArrowRight size={14} /> Track Order</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition flex items-center gap-2"><ArrowRight size={14} /> Warranty Policy</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition flex items-center gap-2"><ArrowRight size={14} /> Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition flex items-center gap-2"><ArrowRight size={14} /> Returns & Refund</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs border-l-2 border-red-600 pl-3">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111] flex items-center justify-center text-red-500 shrink-0 border border-white/5"><MapPin size={16} /></div>
                  <span className="text-gray-400">Devsamp Services, Gondalpara,<br/>West Bengal, India - 712137</span>
              </li>
              <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111] flex items-center justify-center text-red-500 shrink-0 border border-white/5"><Phone size={16} /></div>
                  <span className="text-white font-bold">+91-9876543210</span>
              </li>
              <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111] flex items-center justify-center text-red-500 shrink-0 border border-white/5"><Mail size={16} /></div>
                  <span className="text-gray-400 hover:text-white transition">support@devsamp.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Strip (Optional) */}
        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h4 className="text-white font-bold text-lg">Subscribe to our Newsletter</h4>
                <p className="text-xs text-gray-500">Get the latest updates on new products and upcoming sales.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
                <input type="email" placeholder="Enter your email" className="bg-[#050505] border border-white/10 text-white px-4 py-2.5 rounded-lg text-sm w-full md:w-64 focus:outline-none focus:border-red-500 transition" />
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition">Subscribe</button>
            </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Devsamp Services. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span> <Heart size={12} className="text-red-600 fill-red-600" /> <span>for Gamers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;