// src/lib/hooks/useCampaigns.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { campaignsApi } from '@/lib/api/services';
import { CampaignsFilters, CampaignRequest } from '@/lib/api/types';

export const useCampaigns = (filters?: CampaignsFilters) => {
  return useQuery({
    queryKey: ['campaigns', filters],
    queryFn: () => campaignsApi.getAll(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCampaign = (id: string) => {
  return useQuery({
    queryKey: ['campaigns', id],
    queryFn: () => campaignsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTrendingCampaigns = (params?: { limit?: number; days?: number }) => {
  return useQuery({
    queryKey: ['campaigns', 'trending', params],
    queryFn: () => campaignsApi.getTrending(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCampaignsByCategory = (category: string, params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['campaigns', 'category', category, params],
    queryFn: () => campaignsApi.getByCategory(category, params),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

export const useMyCampaigns = () => {
  const createdQuery = useQuery({
    queryKey: ['campaigns', 'my', 'created'],
    queryFn: () => campaignsApi.getMyCreated(),
    staleTime: 2 * 60 * 1000,
  });

  const supportedQuery = useQuery({
    queryKey: ['campaigns', 'my', 'supported'],
    queryFn: () => campaignsApi.getMySupported(),
    staleTime: 2 * 60 * 1000,
  });

  return {
    created: createdQuery,
    supported: supportedQuery,
  };
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CampaignRequest) => campaignsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', 'my', 'created'] });
    },
  });
};

export const useCampaignSupport = () => {
  const queryClient = useQueryClient();

  const supportMutation = useMutation({
    mutationFn: (campaignId: string) => campaignsApi.support(campaignId),
    onSuccess: (_, campaignId) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', 'my', 'supported'] });
    },
  });

  const unsupportMutation = useMutation({
    mutationFn: (campaignId: string) => campaignsApi.unsupport(campaignId),
    onSuccess: (_, campaignId) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', 'my', 'supported'] });
    },
  });

  return {
    support: supportMutation.mutate,
    unsupport: unsupportMutation.mutate,
    supportLoading: supportMutation.isPending,
    unsupportLoading: unsupportMutation.isPending,
  };
};

export const useCampaignActions = () => {
  const queryClient = useQueryClient();

  const addUpdateMutation = useMutation({
    mutationFn: ({ campaignId, content }: { campaignId: string; content: string }) =>
      campaignsApi.addUpdate(campaignId, content),
    onSuccess: (_, { campaignId }) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
    },
  });

  const addDiscussionMutation = useMutation({
    mutationFn: ({ campaignId, content }: { campaignId: string; content: string }) =>
      campaignsApi.addDiscussion(campaignId, content),
    onSuccess: (_, { campaignId }) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
    },
  });

  const replyToDiscussionMutation = useMutation({
    mutationFn: ({ campaignId, discussionId, content }: {
      campaignId: string;
      discussionId: string;
      content: string;
    }) => campaignsApi.replyToDiscussion(campaignId, discussionId, content),
    onSuccess: (_, { campaignId }) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
    },
  });

  return {
    addUpdate: addUpdateMutation.mutate,
    addDiscussion: addDiscussionMutation.mutate,
    replyToDiscussion: replyToDiscussionMutation.mutate,
    addUpdateLoading: addUpdateMutation.isPending,
    addDiscussionLoading: addDiscussionMutation.isPending,
    replyLoading: replyToDiscussionMutation.isPending,
  };
};
