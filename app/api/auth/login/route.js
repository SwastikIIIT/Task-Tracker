import { signToken, verifyPassword } from "@/lib/auth";
import { connectToMongo } from "@/lib/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {

  try
  {
    await connectToMongo();

    const {email,password} = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

  
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

   
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token=signToken({userId:user._id.toString(),email:user.email});

    console.log(`User logged in: ${user.email}`);

    return NextResponse.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  }
  catch(error)
  {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
