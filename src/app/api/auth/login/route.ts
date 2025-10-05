import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    console.log("🔐 Login attempt started");
    const body = await request.json();
    console.log("📧 Email:", body.email);

    // Validate input
    const validatedData = loginSchema.parse(body);
    console.log("✅ Input validation passed");

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    console.log("👤 User found:", user.email, "Active:", user.isActive);

    // Check if user is active
    if (!user.isActive) {
      console.log("❌ User account is deactivated");
      return NextResponse.json(
        { error: "Account is deactivated. Please contact support." },
        { status: 401 },
      );
    }

    // Verify password
    console.log("🔑 Verifying password...");
    const isPasswordValid = await verifyPassword(
      validatedData.password,
      user.password,
    );

    console.log("🔑 Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Invalid password");
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Generate JWT token
    console.log("🎫 Generating JWT token...");
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Prepare user data (exclude password)
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
      createdAt: user.createdAt,
    };

    console.log("📦 Preparing response...");

    // Create response with token in cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: userData,
      token,
    });

    // Set HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    console.log("✅ Login successful for:", user.email);
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }

    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
