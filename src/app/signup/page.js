"use client";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, UserPlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 🔥 Redirect के लिए

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
      // 🔥 API Call
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("🎉 Account created! Redirecting to login...");
      router.push("/login"); // सफल होने पर लॉगिन पेज पर भेजें

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
          <h2 className="text-3xl font-black text-white tracking-tight">Join DevSamp</h2>
          <p className="text-gray-400 text-sm mt-2">Start building your dream PC today</p>
        </div>

        <div className="p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded flex items-center justify-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-gray-400" size={20} />
                </div>
                <input 
                  name="name"
                  type="text" 
                  required
                  placeholder="John Doe"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="john@example.com"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input 
                  name="password"
                  type="password" 
                  required
                  placeholder="Create a strong password"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
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
                <> <UserPlus size={20} /> Create Account </>
              )}
            </button>

          </form>

          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-xs text-gray-400 font-semibold uppercase">Or sign up with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button type="button" className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2 mb-6">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Sign up with Google
          </button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-red-600 font-bold hover:underline">
              Login here
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}