"use client";
import { useEffect, useState } from "react";
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronDown, MapPin } from "lucide-react";

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ऑर्डर्स लोड करें
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // स्टेटस अपडेट करें
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        alert("Order Status Updated! ✅");
        fetchOrders(); // रिफ्रेश करें
      } else {
        alert("Failed to update status ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const getStatusColor = (status) => {
    if (status === "Delivered") return "text-green-500 bg-green-500/10 border-green-500/20";
    if (status === "Shipped") return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    if (status === "Cancelled") return "text-red-500 bg-red-500/10 border-red-500/20";
    return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
  };

  if (loading) return <div className="p-10 text-white text-center">Loading Orders...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
          <Package className="text-red-500" /> Manage Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition">
              
              {/* Header Row */}
              <div className="bg-white/5 p-4 flex flex-wrap justify-between items-center gap-4 border-b border-white/5">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Order ID</p>
                  <p className="font-mono text-gray-300">#{order._id.slice(-6)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Customer</p>
                  <p className="font-bold text-white">{order.user?.name || "Guest"}</p>
                  <p className="text-xs text-gray-500">{order.user?.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Amount</p>
                  <p className="font-bold text-white">₹{order.totalPrice.toLocaleString()}</p>
                </div>
                
                {/* Status Dropdown */}
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Update Status</p>
                  <div className="relative">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer ${getStatusColor(order.status)}`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-2 pointer-events-none opacity-50" />
                  </div>
                </div>
              </div>

              {/* Details Body */}
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Items */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Items Ordered</h4>
                  <ul className="space-y-2">
                    {order.orderItems.map((item, i) => (
                      <li key={i} className="flex justify-between text-sm text-gray-300 border-b border-white/5 pb-2 last:border-0">
                        <span>{item.qty}x {item.name}</span>
                        <span className="text-gray-500">₹{item.price.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shipping Address */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Shipping To</h4>
                  <div className="text-sm text-gray-300 flex items-start gap-2">
                    <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <p>
                      {order.shippingAddress.address}, <br/>
                      {order.shippingAddress.city} - {order.shippingAddress.postalCode}, <br/>
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-10 bg-[#111] rounded-2xl border border-white/10">
              <p className="text-gray-500">No orders received yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}