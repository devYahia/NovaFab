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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Verify token with the server
        const response = await fetch("/api/auth/check", {
          credentials: "include",
          cache: "no-cache",
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.success && !!data.user);
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

  // Show loading state while checking
  if (isLoading) {
    return (
      <div className={className}>
        <Factory className={iconClassName} />
        <span className={textClassName}>NovaFab</span>
      </div>
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