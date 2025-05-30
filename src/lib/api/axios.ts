import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
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
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token")
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        const { status, data } = error.response
        const errorData = data as ApiError

        // Handle token expiration
        if (status === 401) {
          // Clear token and redirect to login
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token")
            localStorage.removeItem("refresh_token")
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

// Helper function to set token
export const setAuthToken = (token: string | null) => {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("auth_token", token)
    } else {
      localStorage.removeItem("auth_token")
    }
  }
}

// Helper function to get token
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}
