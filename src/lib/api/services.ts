/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient, setAuthToken } from './axios';
import {
  User,
  Official,
  Rating,
  Promise,
  Campaign,
  LearningModule,
  District,
  AuthResponse,
  ApiResponse,
  PaginatedResponse,
  RegisterRequest,
  LoginRequest,
  RatingRequest,
  CampaignRequest,
  OfficialsFilters,
  CampaignsFilters,
  PromisesFilters,
  LearningFilters,
} from './types';

// Auth Service
export const authApi = {
  register: async (data: RegisterRequest): globalThis.Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    if (response.data.data.token) {
      setAuthToken(response.data.data.token);
    }
    return response.data;
  },

  login: async (data: LoginRequest): globalThis.Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    if (response.data.data.token) {
      setAuthToken(response.data.data.token);
    }
    return response.data;
  },

  refreshToken: async (refreshToken: string): globalThis.Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/refresh-token', {
      refreshToken,
    });
    if (response.data.data.token) {
      setAuthToken(response.data.data.token);
    }
    return response.data;
  },

  verifyEmail: async (token: string): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.get<ApiResponse<any>>(`/auth/verify-email/${token}`);
    return response.data;
  },

  forgotPassword: async (email: string): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (
    token: string,
    password: string,
    confirmPassword: string
  ): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(`/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    });
    return response.data;
  },

  getCurrentUser: async (): globalThis.Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): globalThis.Promise<ApiResponse<User>> => {
    const response = await apiClient.patch<ApiResponse<User>>('/auth/me', data);
    return response.data;
  },

  logout: () => {
    setAuthToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('refresh_token');
    }
  },
};

// Officials Service
export const officialsApi = {
  getAll: async (filters?: OfficialsFilters): globalThis.Promise<PaginatedResponse<Official>> => {
    const response = await apiClient.get<PaginatedResponse<Official>>('/officials', {
      params: filters,
    });
    return response.data;
  },

  getById: async (id: string): globalThis.Promise<ApiResponse<Official>> => {
    const response = await apiClient.get<ApiResponse<Official>>(`/officials/${id}`);
    return response.data;
  },

  getTopRated: async (params?: { limit?: number; district?: string }): globalThis.Promise<ApiResponse<Official[]>> => {
    const response = await apiClient.get<ApiResponse<Official[]>>('/officials/top-rated', {
      params,
    });
    return response.data;
  },

  rate: async (officialId: string, rating: RatingRequest): globalThis.Promise<ApiResponse<Rating>> => {
    const response = await apiClient.post<ApiResponse<Rating>>(`/officials/${officialId}/rate`, rating);
    return response.data;
  },

  upvoteRating: async (ratingId: string): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(`/officials/ratings/${ratingId}/upvote`);
    return response.data;
  },

  downvoteRating: async (ratingId: string): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(`/officials/ratings/${ratingId}/downvote`);
    return response.data;
  },

  create: async (data: Partial<Official>): globalThis.Promise<ApiResponse<Official>> => {
    const response = await apiClient.post<ApiResponse<Official>>('/officials', data);
    return response.data;
  },
};

// Promises Service
export const promisesApi = {
  getAll: async (filters?: PromisesFilters): globalThis.Promise<PaginatedResponse<Promise>> => {
    const response = await apiClient.get<PaginatedResponse<Promise>>('/promises', {
      params: filters,
    });
    return response.data;
  },

  getById: async (id: string): globalThis.Promise<ApiResponse<Promise>> => {
    const response = await apiClient.get<ApiResponse<Promise>>(`/promises/${id}`);
    return response.data;
  },

  getByOfficial: async (officialId: string, status?: string): globalThis.Promise<ApiResponse<Promise[]>> => {
    const response = await apiClient.get<ApiResponse<Promise[]>>(`/promises/official/${officialId}`, {
      params: { status },
    });
    return response.data;
  },

  getStatistics: async (params?: { officialId?: string; district?: string }): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.get<ApiResponse<any>>('/promises/statistics', { params });
    return response.data;
  },

  create: async (data: {
    officialId: string;
    title: string;
    description: string;
    category: string;
    datePromised: string;
    source?: string;
  }): globalThis.Promise<ApiResponse<Promise>> => {
    const response = await apiClient.post<ApiResponse<Promise>>('/promises', data);
    return response.data;
  },

  addEvidence: async (
    promiseId: string,
    evidence: {
      description: string;
      source: string;
      status: 'supporting' | 'opposing';
    }
  ): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(`/promises/${promiseId}/evidence`, evidence);
    return response.data;
  },

  addComment: async (promiseId: string, text: string): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(`/promises/${promiseId}/comment`, { text });
    return response.data;
  },

  upvoteEvidence: async (promiseId: string, evidenceIndex: number): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(
      `/promises/${promiseId}/evidence/${evidenceIndex}/upvote`
    );
    return response.data;
  },
};

// Campaigns Service
export const campaignsApi = {
  getAll: async (filters?: CampaignsFilters): globalThis.Promise<PaginatedResponse<Campaign>> => {
    const response = await apiClient.get<PaginatedResponse<Campaign>>('/campaigns', {
      params: filters,
    });
    return response.data;
  },

  getById: async (id: string): globalThis.Promise<ApiResponse<Campaign>> => {
    const response = await apiClient.get<ApiResponse<Campaign>>(`/campaigns/${id}`);
    return response.data;
  },

  getStatistics: async (params?: { district?: string; category?: string }): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.get<ApiResponse<any>>('/campaigns/statistics', { params });
    return response.data;
  },

  getTrending: async (params?: { limit?: number; days?: number }): globalThis.Promise<ApiResponse<Campaign[]>> => {
    const response = await apiClient.get<ApiResponse<Campaign[]>>('/campaigns/trending', { params });
    return response.data;
  },

  getByCategory: async (
    category: string,
    params?: { page?: number; limit?: number }
  ): globalThis.Promise<PaginatedResponse<Campaign>> => {
    const response = await apiClient.get<PaginatedResponse<Campaign>>(`/campaigns/category/${category}`, {
      params,
    });
    return response.data;
  },

  getMyCreated: async (): globalThis.Promise<ApiResponse<Campaign[]>> => {
    const response = await apiClient.get<ApiResponse<Campaign[]>>('/campaigns/my/created');
    return response.data;
  },

  getMySupported: async (): globalThis.Promise<ApiResponse<Campaign[]>> => {
    const response = await apiClient.get<ApiResponse<Campaign[]>>('/campaigns/my/supported');
    return response.data;
  },

  create: async (data: CampaignRequest): globalThis.Promise<ApiResponse<Campaign>> => {
    const response = await apiClient.post<ApiResponse<Campaign>>('/campaigns', data);
    return response.data;
  },

  support: async (campaignId: string): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(`/campaigns/${campaignId}/support`);
    return response.data;
  },

  unsupport: async (campaignId: string): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/campaigns/${campaignId}/support`);
    return response.data;
  },

  addUpdate: async (campaignId: string, content: string): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(`/campaigns/${campaignId}/update`, { content });
    return response.data;
  },

  addDiscussion: async (campaignId: string, content: string): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(`/campaigns/${campaignId}/discussion`, { content });
    return response.data;
  },

  replyToDiscussion: async (
    campaignId: string,
    discussionId: string,
    content: string
  ): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(
      `/campaigns/${campaignId}/discussion/${discussionId}/reply`,
      { content }
    );
    return response.data;
  },
};

// Learning Service
export const learningApi = {
  getModules: async (filters?: LearningFilters): globalThis.Promise<PaginatedResponse<LearningModule>> => {
    const response = await apiClient.get<PaginatedResponse<LearningModule>>('/learning/modules', {
      params: filters,
    });
    return response.data;
  },

  getModuleById: async (id: string): globalThis.Promise<ApiResponse<LearningModule>> => {
    const response = await apiClient.get<ApiResponse<LearningModule>>(`/learning/modules/${id}`);
    return response.data;
  },

  getModulesByCategory: async (
    category: string,
    region?: string
  ): globalThis.Promise<ApiResponse<LearningModule[]>> => {
    const response = await apiClient.get<ApiResponse<LearningModule[]>>(
      `/learning/modules/category/${category}`,
      { params: { region } }
    );
    return response.data;
  },

  getUserProgress: async (params?: { page?: number; completed?: boolean }): globalThis.Promise<PaginatedResponse<any>> => {
    const response = await apiClient.get<PaginatedResponse<any>>('/learning/progress/user', { params });
    return response.data;
  },

  getCompletedModules: async (): globalThis.Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get<ApiResponse<any[]>>('/learning/progress/completed');
    return response.data;
  },

  getRecommendations: async (limit?: number): globalThis.Promise<ApiResponse<LearningModule[]>> => {
    const response = await apiClient.get<ApiResponse<LearningModule[]>>('/learning/recommendations', {
      params: { limit },
    });
    return response.data;
  },

  getStatistics: async (params?: { category?: string; region?: string }): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.get<ApiResponse<any>>('/learning/statistics', { params });
    return response.data;
  },

  updateProgress: async (moduleId: string, progress: number): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>('/learning/progress', { moduleId, progress });
    return response.data;
  },

  submitQuiz: async (moduleId: string, answers: string[]): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(`/learning/quiz/${moduleId}`, { answers });
    return response.data;
  },
};

// Districts Service
export const districtsApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    region?: string;
    active?: boolean;
  }): globalThis.Promise<PaginatedResponse<District>> => {
    const response = await apiClient.get<PaginatedResponse<District>>('/districts', { params });
    return response.data;
  },

  getById: async (id: string, includeStats?: boolean): globalThis.Promise<ApiResponse<District>> => {
    const response = await apiClient.get<ApiResponse<District>>(`/districts/${id}`, {
      params: { includeStats },
    });
    return response.data;
  },

  getByRegion: async (
    region: string,
    params?: { type?: string; active?: boolean }
  ): globalThis.Promise<ApiResponse<District[]>> => {
    const response = await apiClient.get<ApiResponse<District[]>>(`/districts/region/${region}`, { params });
    return response.data;
  },

  getByType: async (
    type: string,
    params?: { region?: string; active?: boolean }
  ): globalThis.Promise<ApiResponse<District[]>> => {
    const response = await apiClient.get<ApiResponse<District[]>>(`/districts/type/${type}`, { params });
    return response.data;
  },

  getStatistics: async (id: string): globalThis.Promise<ApiResponse<any>> => {
    const response = await apiClient.get<ApiResponse<any>>(`/districts/${id}/statistics`);
    return response.data;
  },

  getOfficials: async (
    id: string,
    params?: { page?: number; limit?: number; position?: string }
  ): globalThis.Promise<PaginatedResponse<Official>> => {
    const response = await apiClient.get<PaginatedResponse<Official>>(`/districts/${id}/officials`, {
      params,
    });
    return response.data;
  },

  getCampaigns: async (
    id: string,
    params?: { page?: number; limit?: number; status?: string }
  ): globalThis.Promise<PaginatedResponse<Campaign>> => {
    const response = await apiClient.get<PaginatedResponse<Campaign>>(`/districts/${id}/campaigns`, {
      params,
    });
    return response.data;
  },

  search: async (
    query: string,
    params?: { limit?: number; type?: string }
  ): globalThis.Promise<ApiResponse<District[]>> => {
    const response = await apiClient.get<ApiResponse<District[]>>('/districts/search', {
      params: { q: query, ...params },
    });
    return response.data;
  },

  getRegions: async (country?: string): globalThis.Promise<ApiResponse<string[]>> => {
    const response = await apiClient.get<ApiResponse<string[]>>('/districts/regions', {
      params: { country },
    });
    return response.data;
  },
};
