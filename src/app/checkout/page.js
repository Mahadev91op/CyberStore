"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { MapPin, CreditCard, CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "India",
  });

  // अगर कार्ट खाली है या यूजर लॉग इन नहीं है, तो रीडायरेक्ट करें
  useEffect(() => {
    if (!user) router.push("/login");
    if (cart.length === 0) router.push("/cart");
  }, [user, cart, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      orderItems: cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.images[0],
        price: item.discountPrice || item.price,
        product: item._id,
      })),
      shippingAddress: formData,
      paymentMethod: "COD", // अभी के लिए Cash on Delivery
      totalPrice: cartTotal,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (res.ok) {
        clearCart(); // कार्ट खाली करें
        alert("🎉 Order Placed Successfully!");
        router.push("/profile"); // या thank-you पेज पर
      } else {
        alert(data.message || "Order Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* --- LEFT: SHIPPING FORM --- */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="text-red-500" /> Shipping Details
          </h2>
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 bg-[#111] p-6 rounded-2xl border border-white/10">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
              <input 
                name="address" required placeholder="House No, Street Name" 
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                <input 
                  name="city" required placeholder="Mumbai" 
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pincode</label>
                <input 
                  name="postalCode" required placeholder="400001" type="number"
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                />
              </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Country</label>
                <input 
                  name="country" value="India" readOnly
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-gray-400 cursor-not-allowed"
                />
            </div>
          </form>
        </div>

        {/* --- RIGHT: ORDER SUMMARY --- */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="text-green-500" /> Order Summary
          </h2>
          <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-6 custom-scrollbar">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 items-center border-b border-white/5 pb-3">
                  <div className="relative w-16 h-16 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                    <Image src={item.images[0]} alt={item.name} width={50} height={50} className="object-contain" />
                    <span className="absolute -top-2 -right-2 bg-gray-700 text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.qty}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500">₹{(item.discountPrice || item.price).toLocaleString()}</p>
                  </div>
                  <div className="font-bold">₹{((item.discountPrice || item.price) * item.qty).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span> <span>₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-green-400"><span>Shipping</span> <span>FREE</span></div>
              <div className="flex justify-between text-xl font-black text-white pt-2 border-t border-white/10 mt-2">
                <span>Total</span> <span>₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={loading}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><CreditCard size={20} /> Place Order (COD)</>}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}