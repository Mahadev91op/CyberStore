"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Loader2 इम्पोर्ट करें (स्पिनर के लिए)
import { BarChart3, Package, ShoppingCart, Users, Plus, ArrowRight, Loader2 } from "lucide-react"; 

export default function AdminDashboard() {
  const { user, isLoading } = useAuth(); // ✅ isLoading यहाँ से लें
  const router = useRouter();
  const [stats, setStats] = useState({ orders: 0, products: 0, users: 0, revenue: 0 });

  useEffect(() => {
    // ✅ अगर अभी लोड हो रहा है, तो कुछ मत करो (इंतजार करो)
    if (isLoading) return;

    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      alert("Access Denied! Only Admins allowed.");
      router.push("/");
    } else {
      setStats({ orders: 12, products: 45, users: 150, revenue: 125000 });
    }
  }, [user, isLoading, router]); // dependency array में isLoading डालें

  // ✅ जब तक लोड हो रहा है, लोडर (Spinner) दिखाएं
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-red-500" size={48} />
      </div>
    );
  }

  // अगर यूजर नहीं है या एडमिन नहीं है, तो पेज न दिखाएं (ऊपर वाला useEffect उन्हें हटा देगा)
  if (!user || user.role !== "admin") return null;

  return (
    // ... (बाकी कोड वही रहेगा जो पहले था) ...
    <div className="min-h-screen bg-[#050505] text-white p-8">
       <div className="max-w-7xl mx-auto">
        {/* ... Header ... */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back, Boss! 👋</p>
          </div>
          <Link 
            href="/admin/products/add" 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition"
          >
            <Plus size={20} /> Add New Product
          </Link>
        </div>
        
        {/* ... Stats Grid ... */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard icon={ShoppingCart} label="Total Orders" value={stats.orders} color="text-blue-500" />
          <StatCard icon={Package} label="Products" value={stats.products} color="text-green-500" />
          <StatCard icon={Users} label="Total Users" value={stats.users} color="text-yellow-500" />
          <StatCard icon={BarChart3} label="Total Revenue" value={`₹${stats.revenue.toLocaleString()}`} color="text-red-500" />
        </div>

        {/* ... Menu Grid ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/products" className="group bg-[#111] p-8 rounded-3xl border border-white/10 hover:border-red-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-4 bg-red-500/10 rounded-2xl text-red-500"><Package size={32} /></div>
              <ArrowRight className="text-gray-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Manage Products</h3>
            <p className="text-gray-500">Add new PC parts, update prices, or manage stock inventory.</p>
          </Link>

          <Link href="/admin/orders" className="group bg-[#111] p-8 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500"><ShoppingCart size={32} /></div>
              <ArrowRight className="text-gray-600 group-hover:text-white transition" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Manage Orders</h3>
            <p className="text-gray-500">View customer orders, update delivery status and track payments.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Component Helper (इसे फ़ाइल के अंत में रखें)
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-white/5 ${color}`}><Icon size={24} /></div>
        <div>
          <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">{label}</p>
          <h4 className="text-2xl font-black text-white">{value}</h4>
        </div>
      </div>
    </div>
  );
}