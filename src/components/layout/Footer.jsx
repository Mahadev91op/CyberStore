// src/components/layout/Footer.js
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#111] text-gray-400 border-t border-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Column 1: About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">DEV<span className="text-red-600">SAMP</span></h2>
          <p className="text-sm leading-relaxed mb-4">
            India's most trusted destination for Custom Gaming PCs, Workstations, and High-Performance Components. We build your dream rig with precision.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition"><Facebook size={20}/></a>
            <a href="#" className="hover:text-whiteQl transition"><Instagram size={20}/></a>
            <a href="#" className="hover:text-white transition"><Twitter size={20}/></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/pc-builder" className="hover:text-red-500">Custom PC Builder</Link></li>
            <li><Link href="/category/laptops" className="hover:text-red-500">Laptops</Link></li>
            <li><Link href="/category/graphics-card" className="hover:text-red-500">Graphics Cards</Link></li>
            <li><Link href="/category/monitors" className="hover:text-red-500">Monitors</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/track-order" className="hover:text-red-500">Track Order</Link></li>
            <li><Link href="/warranty" className="hover:text-red-500">Warranty Policy</Link></li>
            <li><Link href="/shipping" className="hover:text-red-500">Shipping Info</Link></li>
            <li><Link href="/contact" className="hover:text-red-500">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-red-600 mt-1 flex-shrink-0"/>
                <span>Devsamp Services, Gondalpara,<br/>West Bengal, India - 712137</span>
            </li>
            <li className="flex items-center">
                <Phone size={18} className="mr-2 text-red-600 flex-shrink-0"/>
                <span>+91-9876543210</span>
            </li>
            <li className="flex items-center">
                <Mail size={18} className="mr-2 text-red-600 flex-shrink-0"/>
                <span>support@devsamp.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800 pt-6 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Devsamp Services. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;