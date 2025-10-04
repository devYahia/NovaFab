import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { prisma } from "./prisma";

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

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

// Verify JWT token (Node.js runtime)
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    console.log("Auth - Token verification failed");
    return null;
  }
}

// Verify JWT token (Edge Runtime compatible)
export async function verifyTokenEdge(
  token: string,
): Promise<JWTPayload | null> {
  try {
    console.log(
      "Auth - Verifying token with secret:",
      JWT_SECRET.substring(0, 10) + "...",
    );
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log("Auth - Token verification successful:", payload);

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
      if (userId) {
        return {
          id: userId,
          email: payload.email as string,
          role: payload.role as "ADMIN" | "CUSTOMER",
          name: payload.name as string | undefined,
        };
      }
    }
    return null;
  } catch (error) {
    console.log(
      "Auth - Token verification failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return null;
  }
}

// Get user from token (Node.js runtime with database)
export async function getUserFromToken(token: string): Promise<User | null> {
  const payload = verifyToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      isActive: true,
    },
  });

  return user;
}

// Get user from token (Edge Runtime compatible - no database access)
export async function getUserFromTokenEdge(
  token: string,
): Promise<User | null> {
  try {
    console.log("Auth - Verifying token");
    const payload = verifyToken(token);
    console.log(
      "Auth - Token verified, payload:",
      payload
        ? { id: payload.id, email: payload.email, role: payload.role }
        : "No payload",
    );

    return createUserFromPayload(payload);
  } catch (error) {
    console.log("Auth - Token verification failed:", error);
    return null;
  }
}

// Create user object from JWT payload (Edge Runtime compatible)
function createUserFromPayload(payload: JWTPayload | null): User | null {
  if (!payload) return null;

  // Handle admin users (they come from environment variables)
  if (payload.role === "ADMIN") {
    console.log("Auth - Creating admin user from token");
    return {
      id: payload.id || payload.userId || "",
      email: payload.email,
      firstName: "System",
      lastName: "Admin",
      role: "ADMIN" as const,
      isActive: true,
    };
  }

  // Handle customer users
  if (payload.role === "CUSTOMER") {
    console.log("Auth - Creating customer user from token");
    return {
      id: payload.id || payload.userId || "",
      email: payload.email,
      firstName: "Registered",
      lastName: "Customer",
      role: "CUSTOMER" as const,
      isActive: true,
    };
  }

  console.log("Auth - Unknown user role:", payload.role);
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

// Middleware helper to get current user (Node.js runtime with database)
export async function getCurrentUser(
  request: NextRequest,
): Promise<User | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  return getUserFromToken(token);
}

// Middleware helper to get current user (Edge Runtime compatible)
export async function getCurrentUserEdge(
  request: NextRequest,
): Promise<User | null> {
  const token = getTokenFromRequest(request);
  console.log("Auth - Token found:", token ? "Yes" : "No");
  if (!token) return null;

  const user = await getUserFromTokenEdge(token);
  console.log(
    "Auth - User from token:",
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
