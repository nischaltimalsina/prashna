import { useMutation, useQueryClient } from '@tanstack/react-query';
import { campaignsApi } from '@/lib/api/services';
import { Campaign } from '@/lib/api/types';

// Optimistic updates for campaign support
export const useOptimisticCampaignSupport = () => {
  const queryClient = useQueryClient();

  const supportMutation = useMutation({
    mutationFn: (campaignId: string) => campaignsApi.support(campaignId),
    onMutate: async (campaignId: string) => {
      // Cancel outgoing queries for this campaign
      await queryClient.cancelQueries({ queryKey: ['campaigns', campaignId] });

      // Snapshot the previous value
      const previousCampaign = queryClient.getQueryData(['campaigns', campaignId]);

      // Optimistically update the cache
      queryClient.setQueryData(['campaigns', campaignId], (old: Campaign) => {
        if (old) {
          return {
            ...old,
            data: {
              ...old,
              supportersCount: old.supportersCount + 1,
            },
          };
        }
        return old;
      });

      return { previousCampaign };
    },
    onError: (err, campaignId, context) => {
      // Rollback on error
      if (context?.previousCampaign) {
        queryClient.setQueryData(['campaigns', campaignId], context.previousCampaign);
      }
    },
    onSettled: (_, __, campaignId) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
    },
  });

  const unsupportMutation = useMutation({
    mutationFn: (campaignId: string) => campaignsApi.unsupport(campaignId),
    onMutate: async (campaignId: string) => {
      await queryClient.cancelQueries({ queryKey: ['campaigns', campaignId] });
      const previousCampaign = queryClient.getQueryData(['campaigns', campaignId]);

      queryClient.setQueryData(['campaigns', campaignId], (old: Campaign) => {
        if (old) {
          return {
            ...old,
            data: {
              ...old,
              supportersCount: Math.max(0, old.supportersCount - 1),
            },
          };
        }
        return old;
      });

      return { previousCampaign };
    },
    onError: (err, campaignId, context) => {
      if (context?.previousCampaign) {
        queryClient.setQueryData(['campaigns', campaignId], context.previousCampaign);
      }
    },
    onSettled: (_, __, campaignId) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
    },
  });

  return {
    support: supportMutation.mutate,
    unsupport: unsupportMutation.mutate,
    supportLoading: supportMutation.isPending,
    unsupportLoading: unsupportMutation.isPending,
  };
};

// src/components/providers/app-providers.tsx

