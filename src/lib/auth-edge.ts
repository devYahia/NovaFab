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
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Safely convert jose JWTPayload to our custom JWTPayload
    if (
      payload &&
      typeof payload === "object" &&
      "email" in payload &&
      "role" in payload
    ) {
      // Handle both 'id' and 'userId' fields
      const userId = (
        "id" in payload
          ? payload.id
          : "userId" in payload
            ? payload.userId
            : null
      ) as string;
      
      return {
        id: userId,
        userId: userId,
        email: payload.email as string,
        role: payload.role as "ADMIN" | "CUSTOMER",
        name: payload.name as string | undefined,
        iat: payload.iat as number | undefined,
        exp: payload.exp as number | undefined,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

// Edge Runtime compatible user extraction from token
export async function getUserFromTokenEdge(token: string): Promise<User | null> {
  const payload = await verifyTokenEdge(token);
  if (!payload) return null;

  // Handle admin users
  if (payload.role === "ADMIN") {
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
    return {
      id: payload.id || payload.userId || "",
      email: payload.email,
      firstName: "Registered",
      lastName: "Customer",
      role: "CUSTOMER" as const,
      isActive: true,
    };
  }

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
  if (!token) return null;

  const user = await getUserFromTokenEdge(token);
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
