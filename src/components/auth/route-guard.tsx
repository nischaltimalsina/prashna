"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Skeleton } from "@/components/ui/skeleton"

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function RouteGuard({
  children,
  requireAuth = false,
  redirectTo = "/auth/login",
}: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // If auth required but user not authenticated
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo)
        return
      }

      // If user is authenticated but on auth pages, redirect to dashboard
      if (isAuthenticated && pathname.startsWith("/auth")) {
        router.push("/dashboard")
        return
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, router, pathname, redirectTo])

  // Show loading skeleton while checking auth
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  // Don't render if auth check fails
  if (requireAuth && !isAuthenticated) {
    return null
  }

  // Don't render auth pages if already authenticated
  if (isAuthenticated && pathname.startsWith("/auth")) {
    return null
  }

  return <>{children}</>
}

// Higher-order component for protecting pages
export function withAuth<P extends object>(Component: React.ComponentType<P>, requireAuth = true) {
  return function AuthenticatedComponent(props: P) {
    return (
      <RouteGuard requireAuth={requireAuth}>
        <Component {...props} />
      </RouteGuard>
    )
  }
}
