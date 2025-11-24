import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-123";

export async function DELETE(req, context) {
  try {
    await dbConnect();
    
    // URL से ID निकालें (Next.js 15/16 में params async हो सकते हैं)
    const params = await context.params;
    const id = params.id;

    // --- ADMIN CHECK (Security) ---
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
    // -------------------------------

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
  }
}