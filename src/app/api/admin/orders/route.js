import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-123";

// सारे ऑर्डर्स लाने के लिए (Admin Only)
export async function GET(req) {
  try {
    await dbConnect();

    // --- ADMIN CHECK ---
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
      const user = jwt.verify(token.value, JWT_SECRET);
      if (user.role !== "admin") {
        return NextResponse.json({ message: "Access Denied" }, { status: 403 });
      }
    } catch (e) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
    // -------------------

    // सारे ऑर्डर्स लाओ और यूजर की डिटेल्स भी साथ में जोड़ो (.populate)
    const orders = await Order.find({})
      .populate("user", "name email") // User model se name aur email nikalo
      .sort({ createdAt: -1 });

    return NextResponse.json(orders, { status: 200 });

  } catch (error) {
    console.error("Admin Orders Error:", error);
    return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
  }
}