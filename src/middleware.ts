import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserEdge } from "./lib/auth-edge";

// Define protected routes (excluding admin routes which are handled separately)
const protectedRoutes = ["/dashboard", "/profile", "/orders"];

// Define admin-only routes (excluding login page)
const adminRoutes = [
  "/admin/dashboard",
  "/admin/users",
  "/admin/orders",
  "/admin/products",
];

// Define public routes that authenticated users should be redirected from
const authRoutes = ["/login", "/register", "/admin/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get current user
  const user = await getCurrentUserEdge(request);

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Check if route is admin-only
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Check if route is auth route (login/register)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Handle all admin routes (except login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      // Redirect to admin login
      const adminLoginUrl = new URL("/admin/login", request.url);
      adminLoginUrl.searchParams.set(
        "redirect",
        pathname === "/admin" ? "/admin/dashboard" : pathname,
      );
      return NextResponse.redirect(adminLoginUrl);
    }
    if (user.role !== "ADMIN") {
      // Redirect non-admin users to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // If accessing /admin root, redirect to dashboard
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Redirect unauthenticated users from other protected routes to user login
  if (isProtectedRoute && !isAdminRoute && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from auth routes (but not during POST requests)
  if (isAuthRoute && user && request.method === "GET") {
    if (pathname === "/admin/login") {
      // Only allow ADMIN users on admin login page, redirect others to their dashboard
      if (user.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      // If ADMIN user is already authenticated, redirect to admin dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else {
      // Regular users go to user dashboard
      const redirectTo =
        request.nextUrl.searchParams.get("redirect") || "/dashboard";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
