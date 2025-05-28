// src/lib/hooks/useLearning.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { learningApi } from '@/lib/api/services';
import { LearningFilters } from '@/lib/api/types';

export const useLearningModules = (filters?: LearningFilters) => {
  return useQuery({
    queryKey: ['learning', 'modules', filters],
    queryFn: () => learningApi.getModules(filters),
    staleTime: 10 * 60 * 1000, // Learning content is relatively static
  });
};

export const useLearningModule = (id: string) => {
  return useQuery({
    queryKey: ['learning', 'modules', id],
    queryFn: () => learningApi.getModuleById(id),
    enabled: !!id,
    staleTime: 15 * 60 * 1000,
  });
};

export const useLearningModulesByCategory = (category: string, region?: string) => {
  return useQuery({
    queryKey: ['learning', 'modules', 'category', category, region],
    queryFn: () => learningApi.getModulesByCategory(category, region),
    enabled: !!category,
    staleTime: 10 * 60 * 1000,
  });
};

export const useLearningProgress = (params?: { page?: number; completed?: boolean }) => {
  return useQuery({
    queryKey: ['learning', 'progress', 'user', params],
    queryFn: () => learningApi.getUserProgress(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useCompletedModules = () => {
  return useQuery({
    queryKey: ['learning', 'progress', 'completed'],
    queryFn: () => learningApi.getCompletedModules(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useLearningRecommendations = (limit?: number) => {
  return useQuery({
    queryKey: ['learning', 'recommendations', limit],
    queryFn: () => learningApi.getRecommendations(limit),
    staleTime: 10 * 60 * 1000,
  });
};

export const useLearningActions = () => {
  const queryClient = useQueryClient();

  const updateProgressMutation = useMutation({
    mutationFn: ({ moduleId, progress }: { moduleId: string; progress: number }) =>
      learningApi.updateProgress(moduleId, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning', 'progress'] });
    },
  });

  const submitQuizMutation = useMutation({
    mutationFn: ({ moduleId, answers }: { moduleId: string; answers: string[] }) =>
      learningApi.submitQuiz(moduleId, answers),
    onSuccess: (_, { moduleId }) => {
      queryClient.invalidateQueries({ queryKey: ['learning', 'progress'] });
      queryClient.invalidateQueries({ queryKey: ['learning', 'modules', moduleId] });
    },
  });

  return {
    updateProgress: updateProgressMutation.mutate,
    submitQuiz: submitQuizMutation.mutate,
    updateProgressLoading: updateProgressMutation.isPending,
    submitQuizLoading: submitQuizMutation.isPending,
  };
};
