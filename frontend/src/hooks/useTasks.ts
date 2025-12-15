import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';

export const useTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await api.get('/tasks');
            return data;
        },
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask: any) => api.post('/tasks', newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => api.put(`/tasks/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => api.delete(`/tasks/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};
