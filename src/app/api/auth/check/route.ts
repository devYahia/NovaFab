import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserEdge } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Get all cookies
    const cookies = request.cookies.getAll();

    // Get current user
    const user = await getCurrentUserEdge(request);

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