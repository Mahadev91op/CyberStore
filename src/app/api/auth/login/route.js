import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-123"; // .env में डालना बेहतर है

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // 1. डेटा वैलिडेशन
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and Password are required" },
        { status: 400 }
      );
    }

    // 2. यूजर ढूँढें
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // 3. पासवर्ड मैच करें
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // 4. JWT टोकन बनाएं
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" } // 7 दिन तक लॉगिन रहेगा
    );

    // 5. रिस्पॉन्स (कुकी सेट करें)
    // 👇 user object में 'role' और '_id' भी भेजें
const response = NextResponse.json(
  { 
    message: "Login successful!", 
    user: { 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role // ✅ यह सबसे ज़रूरी है
    } 
  },
  { status: 200 }
);

    // टोकन को सुरक्षित कुकी में सेव करें
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}