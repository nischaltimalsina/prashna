"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import axios from "axios"
import Cookies from "js-cookie"

// Updated types to match your API response
type User = {
  _id: string // Changed from 'id' to '_id'
  email: string
  firstName: string
  lastName: string
  role: string
  level: string
  impactPoints: number
}

type AuthState = {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<boolean>
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  checkAuth: async () => false,
}

const AuthContext = createContext<AuthState>(initialState)

// Set up API client with authentication
const apiClient = axios.create({
  baseURL: "http://localhost:3030/api/v1",
})

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken") // Changed from 'token' to 'accessToken'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      const savedToken = Cookies.get("accessToken") // Changed from 'token'
      if (!savedToken) {
        return false
      }

      setToken(savedToken)
      const response = await apiClient.get("/auth/me")

      // Handle your API response structure
      if (response.data.success || response.data.status === "success") {
        setUser(response.data.data)
        return true
      }

      return false
    } catch (error) {
      console.error("Auth check failed:", error)
      Cookies.remove("accessToken")
      setToken(null)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Login function - Fixed to handle your API response
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await apiClient.post("/auth/login", { email, password })

      console.log("Login response:", response.data)

      // Handle your API response structure
      if (response.data.status === "success" && response.data.data) {
        const { user, accessToken } = response.data.data

        // Store token in cookie
        Cookies.set("accessToken", accessToken, {
          expires: 1, // 1 day
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })

        setUser(user)
        setToken(accessToken)

        // Redirect to dashboard after login
        router.push("/")
      } else {
        throw new Error(response.data.message || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        (error as { message?: string }).message ||
        "Login failed"
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    Cookies.remove("accessToken") // Changed from 'token'
    setUser(null)
    setToken(null)
    router.push("/auth/login")
  }

  // Check authentication on initial load
  useEffect(() => {
    const initAuth = async () => {
      const isAuthenticated = await checkAuth()

      // If not authenticated and trying to access protected route
      if (
        !isAuthenticated &&
        !pathname.startsWith("/auth") &&
        pathname !== "/" &&
        !pathname.startsWith("/_next")
      ) {
        router.push("/auth/login")
      }

      // If authenticated and trying to access auth routes
      if (isAuthenticated && pathname.startsWith("/auth")) {
        router.push("/")
      }
    }

    initAuth()
  }, [pathname])

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthProvider = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuthProvider must be used within an AuthProvider")
  }

  return context
}
