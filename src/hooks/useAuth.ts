import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { authApi } from "@/lib/api/services"
import { User, RegisterRequest, LoginRequest, AuthResponse, ApiResponse } from "@/lib/api/types"

export const useAuth = () => {
  const queryClient = useQueryClient()

  // Get current user
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authApi.getCurrentUser(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data: AuthResponse) => {
      queryClient.setQueryData(["auth", "me"], { data: data.data.user })
    },
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data: AuthResponse) => {
      queryClient.setQueryData(["auth", "me"], { data: data.data.user })
    },
  })

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<User>) => authApi.updateProfile(data),
    onSuccess: (data: ApiResponse<User>) => {
      queryClient.setQueryData(["auth", "me"], data)
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => {
      authApi.logout()
      return Promise.resolve()
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
  })

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: ({
      token,
      password,
      confirmPassword,
    }: {
      token: string
      password: string
      confirmPassword: string
    }) => authApi.resetPassword(token, password, confirmPassword),
  })

  return {
    user: user?.data,
    isLoading,
    error,
    isAuthenticated: !!user?.data,
    register: registerMutation.mutate,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    registerLoading: registerMutation.isPending,
    loginLoading: loginMutation.isPending,
    updateLoading: updateProfileMutation.isPending,
    registerError: registerMutation.error,
    loginError: loginMutation.error,
    updateError: updateProfileMutation.error,
  }
}
