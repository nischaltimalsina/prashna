import { useInfiniteQuery } from '@tanstack/react-query';
import { officialsApi, campaignsApi, promisesApi } from '@/lib/api/services';
import { OfficialsFilters, CampaignsFilters, PromisesFilters } from '@/lib/api/types';

export const useInfiniteOfficials = (filters?: Omit<OfficialsFilters, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['officials', 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      officialsApi.getAll({ ...filters, page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination;
      return page < pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000,
  });
};

// Infinite scroll for campaigns
export const useInfiniteCampaigns = (filters?: Omit<CampaignsFilters, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['campaigns', 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      campaignsApi.getAll({ ...filters, page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination;
      return page < pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000,
  });
};

// Infinite scroll for promises
export const useInfinitePromises = (filters?: Omit<PromisesFilters, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['promises', 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      promisesApi.getAll({ ...filters, page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination;
      return page < pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000,
  });
};
