import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-123";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    
    // URL से ID निकालें (Next.js 16 में params async हो सकते हैं)
    const { id } = await params;
    const { status } = await req.json(); // नया स्टेटस (e.g. 'Delivered')

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

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    return NextResponse.json(
      { message: "Order status updated", order: updatedOrder },
      { status: 200 }
    );

  } catch (error) {
    console.error("Update Order Error:", error);
    return NextResponse.json({ message: "Failed to update order" }, { status: 500 });
  }
}