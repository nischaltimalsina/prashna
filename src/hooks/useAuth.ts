"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useCallback } from "react"
import Cookies from "js-cookie"
import { authApi } from "@/lib/api/services"
import { User, RegisterRequest, LoginRequest } from "@/lib/api/types"
import { ApiError } from "@/lib/api/axios"

export const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  // Get tokens from cookies
  const getAuthToken = () => Cookies.get("auth_token")
  const getRefreshToken = () => Cookies.get("refresh_token")

  // Refresh token function
  const refreshUserToken = useCallback(async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    try {
      const response = await authApi.refreshToken(refreshToken)

      // Update tokens in cookies
      Cookies.set("auth_token", response.data.accessToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      if (response.data.refreshToken) {
        Cookies.set("refresh_token", response.data.refreshToken, {
          expires: 30, // Refresh token lasts longer
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
      }

      return response
    } catch (error) {
      // If refresh fails, clear all tokens and redirect to login
      Cookies.remove("auth_token")
      Cookies.remove("refresh_token")
      queryClient.clear()
      router.push("/auth/login")
      throw error
    }
  }, [queryClient, router])

  // Get current user - enabled when we have either token
  const {
    data: userData,
    isLoading,
    error,
    refetch: refetchUser,
  } = useQuery<{ status: string; data: { user: User } }>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        return await authApi.getCurrentUser()
      } catch (error: unknown) {
        // If 401 and we have refresh token, try to refresh
        if ((error as ApiError).status === 401 && getRefreshToken()) {
          await refreshUserToken()
          // Retry the original request
          return await authApi.getCurrentUser()
        }
        throw error
      }
    },
    enabled: !!(getAuthToken() || getRefreshToken()),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  // Auto-refresh token before it expires
  useEffect(() => {
    const authToken = getAuthToken()
    const refreshToken = getRefreshToken()

    if (authToken && refreshToken) {
      // Set up interval to refresh token every 50 minutes (assuming 1 hour expiry)
      const refreshInterval = setInterval(() => {
        refreshUserToken().catch(console.error)
      }, 50 * 60 * 1000) // 50 minutes

      return () => clearInterval(refreshInterval)
    }
  }, [refreshUserToken])

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await authApi.login(data)

      // Store both tokens in cookies
      Cookies.set("auth_token", response.data.accessToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      if (response.data.refreshToken) {
        Cookies.set("refresh_token", response.data.refreshToken, {
          expires: 30, // Refresh token lasts longer
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
      }

      return response
    },
    onSuccess: (authResponse) => {
      // Cache user data immediately
      queryClient.setQueryData(["auth", "me"], {
        success: true,
        data: {
          user: authResponse.data.user,
        },
      })

      // Refetch to ensure fresh data
      refetchUser()

      // Redirect to dashboard
      router.push("/")
    },
    onError: (error) => {
      console.error("Login failed:", error)
      // Clear any existing tokens on login failure
      Cookies.remove("auth_token")
      Cookies.remove("refresh_token")
    },
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await authApi.register(data)

      // Store both tokens
      Cookies.set("auth_token", response.data.accessToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      if (response.data.refreshToken) {
        Cookies.set("refresh_token", response.data.refreshToken, {
          expires: 30,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
      }

      return response
    },
    onSuccess: (authResponse) => {
      queryClient.setQueryData(["auth", "me"], {
        success: true,
        data: {
          user: authResponse.data.user,
        },
      })
      refetchUser()
      router.push("/")
    },
  })

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<User>) => authApi.updateProfile(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "me"], data)
    },
  })

  // Logout function
  const logout = useCallback(() => {
    // Clear tokens
    Cookies.remove("auth_token")
    Cookies.remove("refresh_token")

    // Clear all cached data
    queryClient.clear()

    // Call logout API if needed
    authApi.logout()

    // Redirect to login
    router.push("/auth/login")
  }, [queryClient, router])

  // Check if user is authenticated
  const isAuthenticated = !!(userData?.data?.user && (getAuthToken() || getRefreshToken()))

  return {
    // State
    user: userData?.data?.user || null,
    isLoading,
    error,
    isAuthenticated,

    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    updateProfile: updateProfileMutation.mutate,
    refreshToken: refreshUserToken,

    // Loading states
    loginLoading: loginMutation.isPending,
    registerLoading: registerMutation.isPending,
    updateLoading: updateProfileMutation.isPending,

    // Errors
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    updateError: updateProfileMutation.error,
  }
}
