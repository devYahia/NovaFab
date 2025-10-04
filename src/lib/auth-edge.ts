import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

// User type definition
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "CUSTOMER";
  isActive: boolean;
}

// JWT Payload type
export interface JWTPayload {
  id?: string;
  userId?: string;
  email: string;
  role: "ADMIN" | "CUSTOMER";
  name?: string;
  iat?: number;
  exp?: number;
}

// Edge Runtime compatible JWT verification using jose
export async function verifyTokenEdge(token: string): Promise<JWTPayload | null> {
  try {
    console.log("Auth Edge - Verifying token with jose");
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    console.log("Auth Edge - Token verified successfully:", {
      id: payload.id || payload.userId,
      email: payload.email,
      role: payload.role,
    });
    
    return payload as JWTPayload;
  } catch (error) {
    console.error("Auth Edge - Token verification failed:", error);
    return null;
  }
}

// Edge Runtime compatible user extraction from token
export async function getUserFromTokenEdge(token: string): Promise<User | null> {
  const payload = await verifyTokenEdge(token);
  if (!payload) return null;

  console.log("Auth Edge - Processing payload:", payload);

  // Handle admin users
  if (payload.role === "ADMIN") {
    console.log("Auth Edge - Creating admin user from token");
    return {
      id: payload.id || payload.userId || "",
      email: payload.email,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN" as const,
      isActive: true,
    };
  }

  // Handle customer users
  if (payload.role === "CUSTOMER") {
    console.log("Auth Edge - Creating customer user from token");
    return {
      id: payload.id || payload.userId || "",
      email: payload.email,
      firstName: "Registered",
      lastName: "Customer",
      role: "CUSTOMER" as const,
      isActive: true,
    };
  }

  console.log("Auth Edge - Unknown user role:", payload.role);
  return null;
}

// Extract token from request
export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  // Also check cookies (check both 'token' and 'auth-token')
  const tokenCookie =
    request.cookies.get("token") || request.cookies.get("auth-token");
  return tokenCookie?.value || null;
}

// Middleware helper to get current user (Edge Runtime compatible)
export async function getCurrentUserEdge(
  request: NextRequest,
): Promise<User | null> {
  const token = getTokenFromRequest(request);
  console.log("Auth Edge - Token found:", token ? "Yes" : "No");
  if (!token) return null;

  const user = await getUserFromTokenEdge(token);
  console.log(
    "Auth Edge - User from token:",
    user ? { id: user.id, role: user.role } : "No user",
  );
  return user;
}

// Check if user is admin
export function isAdmin(user: User | null): boolean {
  return user?.role === "ADMIN";
}

// Check if user is customer
export function isCustomer(user: User | null): boolean {
  return user?.role === "CUSTOMER";
}
