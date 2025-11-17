import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ClassCreateRequest, ClassPage } from '../types/class';
import { createClassApi, getAllClassesApi } from '../services/classServices';

interface UseClassOptions {
    page?: number;
    size?: number;
}

export function useClass({ page = 0, size = 10 }: UseClassOptions = {}) {
    const queryClient = useQueryClient();

    const classesQuery = useQuery<ClassPage>({
        queryKey: ['classes', page, size],
        queryFn: () => getAllClassesApi(page, size),
    });

    const createClassMutation = useMutation({
        mutationFn: (payload: ClassCreateRequest) => createClassApi(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
        },
    });

    
    return {
        classesQuery,
        createClassMutation,
        
    };
}
