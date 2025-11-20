import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StudentCreatePayload, StudentDetail, StudentParams, StudentUpdatePayload } from "../types/user";
import {
  createStudentApi,
  getAllStudentAvailableApi,
  getAllStudentsApi,
  getStudentDetailApi,
  updateStudentApi,
} from "../services/userServices";

export function useStudent(params?: Partial<StudentParams>) {
  const queryClient = useQueryClient();

  const studentsQuery = useQuery({
    queryKey: ["students", params],
    queryFn: () => getAllStudentsApi(params || {}),
    placeholderData: (previousData) => previousData,
  });

  const studentsAvailableQuery = useQuery({
    queryKey: ["studentsAvailable"],
    queryFn: getAllStudentAvailableApi,
    staleTime: 1000 * 60 * 5,
  });

  const createStudentMutation = useMutation({
    mutationFn: (payload: StudentCreatePayload) => createStudentApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["studentsAvailable"] });
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: Partial<StudentUpdatePayload> }) =>
      updateStudentApi(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["studentsAvailable"] });
    },
  });

  const studentDetailQuery = (userId: string) =>
    useQuery<StudentDetail>({
      queryKey: ["studentDetail", userId],
      queryFn: () => getStudentDetailApi(userId),
      enabled: !!userId,
      staleTime: 1000 * 60 * 5,
    });

  return {
    createStudentMutation,
    studentsAvailableQuery,
    studentsQuery,
    studentDetailQuery,
    updateStudentMutation
  };
}
