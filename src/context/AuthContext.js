"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ लोडिंग स्टेट जोड़ी
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("cyberstore_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
    setIsLoading(false); // ✅ चेक पूरा होने पर लोडिंग बंद करें
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("cyberstore_user", JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("cyberstore_user");
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout error", e);
    }
    router.push("/");
    router.refresh();
  };

  return (
    // ✅ isLoading भी भेजें ताकि पेजों को पता चले कि अभी चेक चल रहा है
    <AuthContext.Provider value={{ user, login, logout, isLoading }}> 
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);