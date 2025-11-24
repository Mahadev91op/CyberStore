import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-123";

// 1. POST: नया प्रोडक्ट जोड़ने के लिए
export async function POST(req) {
  try {
    await dbConnect();

    // --- ADMIN CHECK (SECURITY) ---
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let user;
    try {
      user = jwt.verify(token.value, JWT_SECRET);
      if (user.role !== "admin") {
        return NextResponse.json({ message: "Access Denied. Admins only." }, { status: 403 });
      }
    } catch (e) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
    // -------------------------------

    const body = await req.json();

    // नया प्रोडक्ट डेटाबेस में बनाएँ
    const product = await Product.create(body);

    return NextResponse.json(
      { message: "Product added successfully!", product },
      { status: 201 }
    );

  } catch (error) {
    console.error("Add Product Error:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}


// ... (ऊपर का POST कोड वैसा ही रहने दें) ...

// 👇 यह GET फंक्शन फाइल के आखिर में जोड़ें
export async function GET(req) {
  try {
    await dbConnect();
    // सारे प्रोडक्ट्स लाओ (नए पहले)
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Fetch Products Error:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}