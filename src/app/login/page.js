"use client";
import Link from "next/link";
import { Mail, Lock, ArrowRight, LogIn, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Context update
      login(data.user);

      alert(`Welcome back! 👋`);
      router.push("/"); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="bg-gray-900 p-8 text-center">
          <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-2">Sign in to access your saved builds & orders</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <a href="#" className="text-xs font-semibold text-red-600 hover:underline">Forgot Password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-red-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <> <LogIn size={20} /> Sign In </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-red-600 font-bold hover:underline">
              Create Account <ArrowRight size={14} className="inline ml-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}