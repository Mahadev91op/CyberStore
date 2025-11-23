import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext"; // 🔥 New Import

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Devsamp Services | Best Custom PC Store",
  description: "Build your dream gaming PC with Devsamp Services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* 🔥 Auth Provider सबसे ऊपर */}
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}