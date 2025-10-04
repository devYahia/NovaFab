import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserEdge } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    console.log("Auth Check - Starting...");

    // Get all cookies
    const cookies = request.cookies.getAll();
    console.log("Auth Check - All cookies:", cookies);

    // Get current user
    const user = await getCurrentUserEdge(request);
    console.log("Auth Check - Current user:", user);

    return NextResponse.json({
      success: true,
      user: user,
      cookies: cookies.map((c) => ({
        name: c.name,
        value: c.value.substring(0, 20) + "...",
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Auth Check - Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
