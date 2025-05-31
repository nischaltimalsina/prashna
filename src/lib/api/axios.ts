import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { ApiResponse } from "./types"

// Create custom error class
export class ApiError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message)
    this.name = "ApiError"
  }
}

// Create axios instance
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api/v1",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Request interceptor to add auth token
  client.interceptors.request.use(
    (config) => {
      // Get token from cookies instead of localStorage
      const token = Cookies.get("auth_token")
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

      if (error.response) {
        const { status, data } = error.response
        const errorData = data as ApiError

        // Handle token expiration with refresh
        if (status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = Cookies.get("refresh_token")
            if (refreshToken) {
              // Try to refresh the token
              const refreshResponse = await axios.post(
                `${
                  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api/v1"
                }/auth/refresh-token`,
                { refreshToken }
              )

              const newToken = refreshResponse.data.data.accessToken

              // Update token in cookies
              Cookies.set("auth_token", newToken, {
                expires: 7,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
              })

              // Update refresh token if provided
              if (refreshResponse.data.data.refreshToken) {
                Cookies.set("refresh_token", refreshResponse.data.data.refreshToken, {
                  expires: 30,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "strict",
                })
              }

              // Retry original request with new token
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`
              }

              return client(originalRequest)
            }
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect will be handled by useAuth
            Cookies.remove("auth_token")
            Cookies.remove("refresh_token")

            // Redirect to login in browser environment
            if (typeof window !== "undefined") {
              window.location.href = "/auth/login"
            }
          }
        }

        throw new ApiError(errorData?.message || "Request failed", status, errorData?.code)
      }

      // Network error
      throw new ApiError("Network error", 0)
    }
  )

  return client
}

export const apiClient = createApiClient()

export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(url, config)
    return response.data.data
  },

  post: async <T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(url, data, config)
    return response.data.data
  },

  put: async <T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.put(url, data, config)
    return response.data.data
  },

  patch: async <T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.patch(url, data, config)
    return response.data.data
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.delete(url, config)
    return response.data.data
  },
}

// Helper function to set token (for auth service)
export const setAuthToken = (token: string | null) => {
  if (token) {
    Cookies.set("auth_token", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
  } else {
    Cookies.remove("auth_token")
  }
}

// Helper function to get token
export const getAuthToken = (): string | null => {
  return Cookies.get("auth_token") || null
}

// Helper function to set refresh token
export const setRefreshToken = (token: string | null) => {
  if (token) {
    Cookies.set("refresh_token", token, {
      expires: 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
  } else {
    Cookies.remove("refresh_token")
  }
}
