import { CampaignsFilters, DistrictFilters, LearningFilters, OfficialsFilters, PromisesFilters } from "../api/types";

// Centralized query key factory for consistency
export const queryKeys = {
  // Auth
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  // Officials
  officials: {
    all: ['officials'] as const,
    lists: () => [...queryKeys.officials.all, 'list'] as const,
    list: (filters?: OfficialsFilters) => [...queryKeys.officials.lists(), filters] as const,
    details: () => [...queryKeys.officials.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.officials.details(), id] as const,
    topRated: (params?: OfficialsFilters) => [...queryKeys.officials.all, 'top-rated', params] as const,
  },

  // Campaigns
  campaigns: {
    all: ['campaigns'] as const,
    lists: () => [...queryKeys.campaigns.all, 'list'] as const,
    list: (filters?: CampaignsFilters) => [...queryKeys.campaigns.lists(), filters] as const,
    details: () => [...queryKeys.campaigns.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.campaigns.details(), id] as const,
    trending: (params?: CampaignsFilters) => [...queryKeys.campaigns.all, 'trending', params] as const,
    byCategory: (category: string, params?: CampaignsFilters) => [...queryKeys.campaigns.all, 'category', category, params] as const,
    my: {
      all: () => [...queryKeys.campaigns.all, 'my'] as const,
      created: () => [...queryKeys.campaigns.my.all(), 'created'] as const,
      supported: () => [...queryKeys.campaigns.my.all(), 'supported'] as const,
    },
  },

  // Promises
  promises: {
    all: ['promises'] as const,
    lists: () => [...queryKeys.promises.all, 'list'] as const,
    list: (filters?: PromisesFilters) => [...queryKeys.promises.lists(), filters] as const,
    details: () => [...queryKeys.promises.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.promises.details(), id] as const,
    byOfficial: (officialId: string, status?: string) => [...queryKeys.promises.all, 'official', officialId, status] as const,
    statistics: (params?: PromisesFilters) => [...queryKeys.promises.all, 'statistics', params] as const,
  },

  // Learning
  learning: {
    all: ['learning'] as const,
    modules: {
      all: () => [...queryKeys.learning.all, 'modules'] as const,
      lists: () => [...queryKeys.learning.modules.all(), 'list'] as const,
      list: (filters?: LearningFilters) => [...queryKeys.learning.modules.lists(), filters] as const,
      details: () => [...queryKeys.learning.modules.all(), 'detail'] as const,
      detail: (id: string) => [...queryKeys.learning.modules.details(), id] as const,
      byCategory: (category: string, region?: string) => [...queryKeys.learning.modules.all(), 'category', category, region] as const,
    },
    progress: {
      all: () => [...queryKeys.learning.all, 'progress'] as const,
      user: (params?: LearningFilters) => [...queryKeys.learning.progress.all(), 'user', params] as const,
      completed: () => [...queryKeys.learning.progress.all(), 'completed'] as const,
    },
    recommendations: (limit?: number) => [...queryKeys.learning.all, 'recommendations', limit] as const,
  },

  // Districts
  districts: {
    all: ['districts'] as const,
    lists: () => [...queryKeys.districts.all, 'list'] as const,
    list: (params?: DistrictFilters) => [...queryKeys.districts.lists(), params] as const,
    details: () => [...queryKeys.districts.all, 'detail'] as const,
    detail: (id: string, includeStats?: boolean) => [...queryKeys.districts.details(), id, includeStats] as const,
    byRegion: (region: string, params?: DistrictFilters) => [...queryKeys.districts.all, 'region', region, params] as const,
    byType: (type: string, params?: DistrictFilters) => [...queryKeys.districts.all, 'type', type, params] as const,
    search: (query: string, params?: DistrictFilters) => [...queryKeys.districts.all, 'search', query, params] as const,
    regions: (country?: string) => [...queryKeys.districts.all, 'regions', country] as const,
  },
} as const;
