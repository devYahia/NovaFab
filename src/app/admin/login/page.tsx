"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  User,
  AlertTriangle,
} from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });
        if (response.ok) {
          const user = await response.json();
          if (user.role === "ADMIN") {
            // User is already authenticated as admin, redirect to dashboard
            window.location.replace("/admin/dashboard");
          }
        }
      } catch (error) {
        // Ignore errors, user is not authenticated
        console.log("User not authenticated");
      }
    };

    checkAuth();
  }, []);

  const clearCookies = () => {
    // Clear any existing auth cookies
    document.cookie =
      "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Clear any existing cookies first
      clearCookies();

      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensure cookies are included
      });

      const data = await response.json();
      console.log("Login response:", { status: response.status, data });

      if (response.ok) {
        console.log("Login successful, redirecting to dashboard...");
        // Wait a bit to ensure cookie is set, then redirect to dashboard
        setTimeout(() => {
          console.log("Executing redirect to /admin/dashboard");
          window.location.replace("/admin/dashboard");
        }, 100);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("Connection error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-orange-900 p-4 relative overflow-hidden"
      dir="ltr"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>



      <Card className="w-full max-w-md bg-black/40 border-red-500/30 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-8">
          {/* Admin Logo */}
          <div className="mx-auto mb-6 relative">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Lock className="w-3 h-3 text-black" />
            </div>
          </div>

          <CardTitle className="text-3xl font-bold text-white mb-2">
            Administrator Login
          </CardTitle>
          <CardDescription className="text-red-200">
            Enter administrator credentials to access the control panel
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-white flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Admin Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/50 border-red-500/50 text-white placeholder-red-300/50 text-left pl-10 focus:border-red-400 focus:ring-red-400"
                  placeholder="admin@gmail.com"
                  dir="ltr"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-white flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Secure Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/50 border-red-500/50 text-white placeholder-red-300/50 text-left pl-10 pr-10 focus:border-red-400 focus:ring-red-400"
                  placeholder="••••••••••"
                  dir="ltr"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-300 text-sm text-center bg-red-900/50 border border-red-500/50 p-3 rounded-lg backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Verifying credentials...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Secure System Login
                </>
              )}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="text-center text-xs text-red-300/70 border-t border-red-500/30 pt-4">
            <div className="flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              <span>All login attempts are logged and monitored</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Security Info */}
      <div className="absolute bottom-4 left-4 right-4 text-center text-red-200/50 text-xs">
        NovaFab Admin Panel v2.0 - Secure Access Only
      </div>
    </div>
  );
}