import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ClassCreateRequest, ClassPage, ClassResponse } from '../types/class';
import { createClassApi, getAllClassesApi, updateClassApi, getClassByCourseApi } from '../services/classServices';

interface UseClassOptions {
    page?: number;
    size?: number;
    courseId?: string;
}

export function useClass({ page = 0, size = 10, courseId }: UseClassOptions = {}) {
    const queryClient = useQueryClient();

    const classesQuery = useQuery<ClassPage>({
        queryKey: ['classes', page, size],
        queryFn: () => getAllClassesApi(page, size),
    });

    const classByCourseQuery = useQuery<ClassResponse[]>({
        queryKey: ['classByCourse', courseId],
        queryFn: () => getClassByCourseApi(courseId!),
        enabled: !!courseId, 
    });

    const createClassMutation = useMutation({
        mutationFn: (payload: ClassCreateRequest) => createClassApi(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
        },
    });

    const updateClassMutation = useMutation({
        mutationFn: (data: { classId: string; payload: Partial<ClassCreateRequest> }) =>
            updateClassApi(data.classId, data.payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
            queryClient.invalidateQueries({ queryKey: ['classByCourse'] });
        },
    });

    return {
        classesQuery,
        classByCourseQuery,

        createClassMutation,
        updateClassMutation,
    };
}
