"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // पेज लोड होने पर चेक करो कि यूजर पहले से लॉगिन है क्या (LocalStorage से)
  useEffect(() => {
    const storedUser = localStorage.getItem("cyberstore_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // लॉगिन फंक्शन
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("cyberstore_user", JSON.stringify(userData));
  };

  // लॉगआउट फंक्शन
  const logout = async () => {
    // 1. Client Side से हटाओ
    setUser(null);
    localStorage.removeItem("cyberstore_user");
    
    // 2. Server Side (Cookie) से हटाओ
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout error", e);
    }

    router.push("/"); // होमपेज पर भेजें
    router.refresh(); // रिफ्रेश ताकि Navbar अपडेट हो जाए
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);