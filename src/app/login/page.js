"use client";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Path check kar lena
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 1. AuthContext se login function nikalo
  const { login } = useContext(AuthContext); 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API Call example (replace with your actual logic)
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // --- STEP 5 IMPLEMENTATION ---
        // Login success hone par context update karein
        login(data.user, data.token); 
        
        alert("Login Successful!");
        router.push("/"); // Home page par redirect
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
       {/* ... Aapka Form JSX yahan rahega ... */}
       <form onSubmit={handleSubmit}>
          {/* inputs... */}
          <button type="submit">Login</button>
       </form>
    </div>
  );
} 
File yahan khatam honi chahiye, iske baad koi text nahi hona chahiye