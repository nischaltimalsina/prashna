// src/lib/hooks/usePromises.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { promisesApi } from '@/lib/api/services';
import { PromisesFilters } from '@/lib/api/types';

export const usePromises = (filters?: PromisesFilters) => {
  return useQuery({
    queryKey: ['promises', filters],
    queryFn: () => promisesApi.getAll(filters),
    staleTime: 2 * 60 * 1000,
  });
};

export const usePromise = (id: string) => {
  return useQuery({
    queryKey: ['promises', id],
    queryFn: () => promisesApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePromisesByOfficial = (officialId: string, status?: string) => {
  return useQuery({
    queryKey: ['promises', 'official', officialId, status],
    queryFn: () => promisesApi.getByOfficial(officialId, status),
    enabled: !!officialId,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePromiseStatistics = (params?: { officialId?: string; district?: string }) => {
  return useQuery({
    queryKey: ['promises', 'statistics', params],
    queryFn: () => promisesApi.getStatistics(params),
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreatePromise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      officialId: string;
      title: string;
      description: string;
      category: string;
      datePromised: string;
      source?: string;
    }) => promisesApi.create(data),
    onSuccess: (_, { officialId }) => {
      queryClient.invalidateQueries({ queryKey: ['promises'] });
      queryClient.invalidateQueries({ queryKey: ['promises', 'official', officialId] });
    },
  });
};

export const usePromiseActions = () => {
  const queryClient = useQueryClient();

  const addEvidenceMutation = useMutation({
    mutationFn: ({ promiseId, evidence }: {
      promiseId: string;
      evidence: { description: string; source: string; status: 'supporting' | 'opposing' };
    }) => promisesApi.addEvidence(promiseId, evidence),
    onSuccess: (_, { promiseId }) => {
      queryClient.invalidateQueries({ queryKey: ['promises', promiseId] });
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: ({ promiseId, text }: { promiseId: string; text: string }) =>
      promisesApi.addComment(promiseId, text),
    onSuccess: (_, { promiseId }) => {
      queryClient.invalidateQueries({ queryKey: ['promises', promiseId] });
    },
  });

  const upvoteEvidenceMutation = useMutation({
    mutationFn: ({ promiseId, evidenceIndex }: { promiseId: string; evidenceIndex: number }) =>
      promisesApi.upvoteEvidence(promiseId, evidenceIndex),
    onSuccess: (_, { promiseId }) => {
      queryClient.invalidateQueries({ queryKey: ['promises', promiseId] });
    },
  });

  return {
    addEvidence: addEvidenceMutation.mutate,
    addComment: addCommentMutation.mutate,
    upvoteEvidence: upvoteEvidenceMutation.mutate,
    addEvidenceLoading: addEvidenceMutation.isPending,
    addCommentLoading: addCommentMutation.isPending,
    upvoteLoading: upvoteEvidenceMutation.isPending,
  };
};

