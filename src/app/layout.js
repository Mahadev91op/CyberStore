// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Font Setup
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Devsamp Services | Best Custom PC Store",
  description: "Build your dream gaming PC with Devsamp Services. Best prices on processors, GPUs, and accessories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* 1. Header is fixed at the top */}
          <Navbar />
          
          {/* 2. Main Content grows to fill space */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* 3. Footer is always at bottom */}
          <Footer />
        </div>
      </body>
    </html>
  );
}