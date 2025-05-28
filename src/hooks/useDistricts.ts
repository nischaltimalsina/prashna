import { useQuery } from '@tanstack/react-query';
import { districtsApi } from '@/lib/api/services';

export const useDistricts = (params?: {
  page?: number;
  limit?: number;
  type?: string;
  region?: string;
  active?: boolean;
}) => {
  return useQuery({
    queryKey: ['districts', params],
    queryFn: () => districtsApi.getAll(params),
    staleTime: 30 * 60 * 1000, // Districts change infrequently
  });
};

export const useDistrict = (id: string, includeStats?: boolean) => {
  return useQuery({
    queryKey: ['districts', id, includeStats],
    queryFn: () => districtsApi.getById(id, includeStats),
    enabled: !!id,
    staleTime: 15 * 60 * 1000,
  });
};

export const useDistrictsByRegion = (region: string, params?: { type?: string; active?: boolean }) => {
  return useQuery({
    queryKey: ['districts', 'region', region, params],
    queryFn: () => districtsApi.getByRegion(region, params),
    enabled: !!region,
    staleTime: 30 * 60 * 1000,
  });
};

export const useDistrictsByType = (type: string, params?: { region?: string; active?: boolean }) => {
  return useQuery({
    queryKey: ['districts', 'type', type, params],
    queryFn: () => districtsApi.getByType(type, params),
    enabled: !!type,
    staleTime: 30 * 60 * 1000,
  });
};

export const useDistrictStatistics = (id: string) => {
  return useQuery({
    queryKey: ['districts', id, 'statistics'],
    queryFn: () => districtsApi.getStatistics(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useDistrictOfficials = (
  id: string,
  params?: { page?: number; limit?: number; position?: string }
) => {
  return useQuery({
    queryKey: ['districts', id, 'officials', params],
    queryFn: () => districtsApi.getOfficials(id, params),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDistrictCampaigns = (
  id: string,
  params?: { page?: number; limit?: number; status?: string }
) => {
  return useQuery({
    queryKey: ['districts', id, 'campaigns', params],
    queryFn: () => districtsApi.getCampaigns(id, params),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchDistricts = (query: string, params?: { limit?: number; type?: string }) => {
  return useQuery({
    queryKey: ['districts', 'search', query, params],
    queryFn: () => districtsApi.search(query, params),
    enabled: !!query && query.length > 0,
    staleTime: 10 * 60 * 1000,
  });
};

export const useRegions = (country?: string) => {
  return useQuery({
    queryKey: ['districts', 'regions', country],
    queryFn: () => districtsApi.getRegions(country),
    staleTime: 60 * 60 * 1000, // 1 hour - regions rarely change
  });
};
