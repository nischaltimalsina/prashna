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
    // Don't do anything while still loading
    if (isLoading) return

    // If auth is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo)
      return
    }

    // If user is authenticated but trying to access auth pages
    if (isAuthenticated && pathname.startsWith("/auth")) {
      router.push("/")
      return
    }
  }, [isAuthenticated, isLoading, requireAuth, router, pathname, redirectTo])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  // Don't render if waiting for redirect
  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (isAuthenticated && pathname.startsWith("/auth")) {
    return null
  }

  return <>{children}</>
}

// HOC for protecting entire pages
export function withAuth<P extends object>(Component: React.ComponentType<P>, requireAuth = true) {
  return function AuthenticatedComponent(props: P) {
    return (
      <RouteGuard requireAuth={requireAuth}>
        <Component {...props} />
      </RouteGuard>
    )
  }
}
