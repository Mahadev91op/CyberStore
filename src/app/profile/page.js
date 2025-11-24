"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
// Lucide Icons
import { Package, User, LogOut, MapPin, Download, Loader2 } from "lucide-react";
import Image from "next/image";
// 🔥 Invoice Generator Logic
import { generateInvoice } from "@/utils/invoiceGenerator";

export default function ProfilePage() {
  // isLoading को useAuth से लें ताकि premature redirect न हो
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    // 1. अगर Auth Context अभी भी लोड हो रहा है, तो रुको
    if (isLoading) return;

    // 2. अगर यूजर लॉग इन नहीं है, तो लॉगिन पेज पर भेजो
    if (!user) {
      router.push("/login");
      return;
    }

    // 3. ऑर्डर्स फेच करें
    const fetchOrders = async () => {
      try {
        // यह API आपके /api/orders GET route को कॉल करेगी
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user, isLoading, router]); // isLoading को dependency array में रखें

  // जब तक डेटा लोड हो रहा है, तब तक लोडर दिखाएं
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-red-500" size={48} />
      </div>
    );
  }

  // अगर loading खत्म हो गया है और user नहीं है, तो page null होगा (useEffect redirect कर देगा)
  if (!user) return null;

  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-500/20 text-green-500";
    if (status === "Shipped") return "bg-blue-500/20 text-blue-500";
    if (status === "Cancelled") return "bg-red-500/20 text-red-500";
    return "bg-yellow-500/20 text-yellow-500";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- LEFT: PROFILE CARD --- */}
        <div className="lg:col-span-1 h-fit">
          <div className="bg-[#111] p-6 rounded-2xl border border-white/10 text-center sticky top-24">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
              {user.name[0]}
            </div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>

            <button
              onClick={logout}
              className="w-full bg-white/5 hover:bg-red-600/20 hover:text-red-500 border border-white/10 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>

        {/* --- RIGHT: ORDER HISTORY --- */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Package className="text-red-500" /> Your Orders
          </h2>

          {loadingOrders ? (
            <div className="text-center py-10 text-gray-500">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-[#111] p-10 rounded-2xl border border-white/10 text-center">
              <p className="text-gray-500">No orders found yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden"
                >
                  {/* Order Header (Invoice Button Added) */}
                  <div className="bg-white/5 p-4 flex flex-wrap justify-between items-center gap-4 border-b border-white/5">
                    {/* Order ID */}
                    <div className="text-sm">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">
                        Order ID
                      </p>
                      <p className="font-mono text-gray-300">
                        #{order._id.slice(-6)}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="text-sm">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">
                        Date
                      </p>
                      <p className="text-gray-300">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Total Amount */}
                    <div className="text-sm">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">
                        Total
                      </p>
                      <p className="font-bold text-white">
                        ₹{order.totalPrice.toLocaleString()}
                      </p>
                    </div>

                    {/* 🔥 INVOICE BUTTON (Final Fix with Promise/Catch) 🔥 */}
                    <button
                      onClick={() => {
                        // 🔥 10 मिलीसेकंड का छोटा सा ब्रेक डाल रहे हैं
                        // ताकि jspdf-autotable को लोड होने का पूरा समय मिल जाए
                        setTimeout(() => {
                          generateInvoice(order).catch((err) => {
                            console.error("Invoice generation failed:", err);
                            alert(
                              "Invoice generation failed. Check console for details."
                            );
                          });
                        }, 10); // 10ms का delay
                      }}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition"
                      title="Download Invoice"
                    >
                      <Download size={14} /> Invoice
                    </button>
                    {/* 🔥 END INVOICE BUTTON 🔥 */}

                    {/* Status */}
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 space-y-4">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              width={40}
                              height={40}
                              alt={item.name}
                              className="object-contain"
                            />
                          ) : (
                            <Package size={20} className="text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.qty} x ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address Footer */}
                  <div className="bg-[#0a0a0a] p-3 px-4 flex items-center gap-2 text-xs text-gray-500 border-t border-white/5">
                    <MapPin size={14} />
                    Delivery to: {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
