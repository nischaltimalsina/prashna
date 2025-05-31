import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { officialsApi } from '@/lib/api/services';
import { OfficialsFilters, RatingRequest } from '@/lib/api/types';

export const useOfficials = (filters?: OfficialsFilters) => {
  return useQuery({
    queryKey: ['officials', filters],
    queryFn: () => officialsApi.getAll(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useOfficial = (id: string) => {
  return useQuery({
    queryKey: ['officials', id],
    queryFn: () => officialsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTopRatedOfficials = (params?: { limit?: number; district?: string }) => {
  return useQuery({
    queryKey: ['officials', 'top-rated', params],
    queryFn: () => officialsApi.getTopRated(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useRateOfficial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ officialId, rating }: { officialId: string; rating: RatingRequest }) =>
      officialsApi.rate(officialId, rating),
    onSuccess: (_, { officialId }) => {
      // Invalidate official data to refetch with new rating
      queryClient.invalidateQueries({ queryKey: ['officials', officialId] });
      queryClient.invalidateQueries({ queryKey: ['officials'] });
    },
  });
};

export const useOfficialRatings = (officialId: string) => {
  return useQuery({
    queryKey: ['officials', officialId, 'ratings'],
    queryFn: () => officialsApi.getRatings(officialId),
    enabled: !!officialId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
export const useVoteRating = () => {
  const queryClient = useQueryClient();

  const upvoteMutation = useMutation({
    mutationFn: (ratingId: string) => officialsApi.upvoteRating(ratingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['officials'] });
    },
  });

  const downvoteMutation = useMutation({
    mutationFn: (ratingId: string) => officialsApi.downvoteRating(ratingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['officials'] });
    },
  });

  return {
    upvote: upvoteMutation.mutate,
    downvote: downvoteMutation.mutate,
    upvoteLoading: upvoteMutation.isPending,
    downvoteLoading: downvoteMutation.isPending,
  };
};
