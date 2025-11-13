import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CoursePage, CourseCreateRequest, CourseUpdateRequest } from '../types/course';
import { createCourseApi, deleteCourseApi, getAllCoursesApi, updateCourseApi } from '../services/courseServices';

interface UseCourseOptions {
    page?: number;
    size?: number;
}

export function useCourse({ page = 0, size = 10 }: UseCourseOptions = {}) {
    const queryClient = useQueryClient();

    const coursesQuery = useQuery<CoursePage>({
        queryKey: ['courses', page, size],
        queryFn: () => getAllCoursesApi(page, size),
    });

    const createCourseMutation = useMutation({
        mutationFn: (payload: CourseCreateRequest) => createCourseApi(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
        },
    });

    const updateCourseMutation = useMutation({
        mutationFn: ({ courseId, payload }: { courseId: string; payload: Partial<CourseUpdateRequest> }) =>
            updateCourseApi(courseId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
        },
    });

    const deleteCourseMutation = useMutation({
        mutationFn: (courseId: string) => deleteCourseApi(courseId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
        },
    });

    return {
        coursesQuery,
        createCourseMutation,
        updateCourseMutation,
        deleteCourseMutation,
    };
}
