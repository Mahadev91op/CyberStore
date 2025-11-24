import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-123";

export async function POST(req) {
  try {
    await dbConnect();

    // 🔥 Fix: cookies() अब async है, इसलिए await लगाना जरूरी है
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token.value, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const { orderItems, shippingAddress, paymentMethod, totalPrice } = await req.json();

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ message: "No order items" }, { status: 400 });
    }

    const order = await Order.create({
      user: decoded.userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: false,
      status: "Processing"
    });

    return NextResponse.json(
      { message: "Order created successfully", order }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json({ message: "Order creation failed" }, { status: 500 });
  }
}

// 👇 GET फंक्शन में भी यही change करें
export async function GET(req) {
  try {
    await dbConnect();

    // 🔥 Fix: यहाँ भी await लगाएं
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token.value, JWT_SECRET);

    const orders = await Order.find({ user: decoded.userId }).sort({ createdAt: -1 });

    return NextResponse.json(orders, { status: 200 });

  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
  }
}