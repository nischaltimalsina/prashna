"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { authApi } from "@/lib/api/services"
import { User, RegisterRequest, LoginRequest } from "@/lib/api/types"

export const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  // Get current user - only if we have a token
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authApi.getCurrentUser(),
    enabled: !!Cookies.get("auth_token"), // Only run if token exists
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await authApi.login(data)

      // Store token in cookie
      Cookies.set("auth_token", response.data.accessToken, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      return response
    },
    onSuccess: (authResponse) => {
      // Cache user data
      queryClient.setQueryData(["auth", "me"], {
        success: true,
        data: authResponse.data.user,
      })

      // Redirect to dashboard
      router.push("/")
    },
    onError: (error) => {
      console.error("Login failed:", error)
      // Clear any existing token on login failure
      Cookies.remove("auth_token")
    },
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await authApi.register(data)

      // Store token
      Cookies.set("auth_token", response.data.accessToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      return response
    },
    onSuccess: (authResponse) => {
      queryClient.setQueryData(["auth", "me"], {
        success: true,
        data: authResponse.data.user,
      })
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
  const logout = () => {
    // Clear token
    Cookies.remove("auth_token")

    // Clear all cached data
    queryClient.clear()

    // Redirect to login
    router.push("/auth/login")
  }

  return {
    // State
    user: userData?.data || null,
    isLoading,
    error,
    isAuthenticated: !!userData?.data && !!Cookies.get("auth_token"),

    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    updateProfile: updateProfileMutation.mutate,

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
