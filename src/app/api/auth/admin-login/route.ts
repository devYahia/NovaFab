import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// Admin credentials from environment variables
const getAdminCredentials = () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "Admin credentials not configured in environment variables",
    );
  }

  return {
    id: "admin-1",
    email: adminEmail,
    password: adminPassword,
    role: "ADMIN",
    name: "System Administrator",
  };
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Get admin credentials from environment
    const adminUser = getAdminCredentials();

    // Check if user is admin
    if (email !== adminUser.email) {
      return NextResponse.json(
        { error: "Invalid login credentials" },
        { status: 401 },
      );
    }

    // Verify password (direct comparison since it's from environment)
    if (password !== adminUser.password) {
      return NextResponse.json(
        { error: "Invalid login credentials" },
        { status: 401 },
      );
    }

    // Create JWT token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "your-secret-key",
    );
    const token = await new SignJWT({
      id: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
      name: adminUser.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        name: adminUser.name,
      },
    });

    // Set cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 },
    );
  }
}