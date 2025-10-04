"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Factory } from "lucide-react";

interface SmartLogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function SmartLogo({
  className = "flex items-center space-x-2",
  iconClassName = "h-8 w-8 text-blue-600",
  textClassName = "text-2xl font-bold text-gray-900",
}: SmartLogoProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if there's a token in cookies
        const token = document.cookie
          .split("; ")
          .find(
            (row) => row.startsWith("token=") || row.startsWith("auth-token="),
          )
          ?.split("=")[1];

        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Verify token with the server
        const response = await fetch("/api/auth/check", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.success && data.user);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Show loading state or default to home while checking
  if (isLoading || isAuthenticated === null) {
    return (
      <Link href="/" className={className}>
        <Factory className={iconClassName} />
        <span className={textClassName}>NovaFab</span>
      </Link>
    );
  }

  // Navigate to dashboard if authenticated, home if not
  const href = isAuthenticated ? "/dashboard" : "/";

  return (
    <Link href={href} className={className}>
      <Factory className={iconClassName} />
      <span className={textClassName}>NovaFab</span>
    </Link>
  );
}
