"use client";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, UserPlus, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      router.push("/login");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white relative overflow-hidden p-4">
      
      {/* Background Glows */}
      <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">Join the Squad</h2>
          <p className="text-gray-500 text-sm">Start building your dream machine today.</p>
        </div>

        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl flex items-center gap-2">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                  <User size={20} />
                </div>
                <input 
                  name="name"
                  type="text" 
                  required
                  placeholder="John Doe"
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] text-white pl-12 pr-4 py-3.5 rounded-xl border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                  <Mail size={20} />
                </div>
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="john@example.com"
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] text-white pl-12 pr-4 py-3.5 rounded-xl border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  name="password"
                  type="password" 
                  required
                  placeholder="Create a strong password"
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] text-white pl-12 pr-4 py-3.5 rounded-xl border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-gray-700"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white hover:bg-gray-200 text-black font-bold py-4 rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <> <UserPlus size={20} /> Create Account </>
              )}
            </button>

          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-4">Or sign up with</p>
            <button type="button" className="w-full bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white font-medium py-3.5 rounded-xl transition flex items-center justify-center gap-3 group">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
              Google Account
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-red-500 font-bold hover:text-red-400 transition inline-flex items-center gap-1">
                Login here <ArrowRight size={14} />
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}