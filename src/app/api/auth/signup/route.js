import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    // 1. डेटाबेस कनेक्ट करें
    await dbConnect();

    // 2. फ्रंटेंड से आया डेटा निकालें
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // 3. चेक करें कि यूजर पहले से है या नहीं
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 }
      );
    }

    // 4. पासवर्ड को एन्क्रिप्ट (Hash) करें
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. नया यूजर बनाएं
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully!", userId: newUser._id },
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}