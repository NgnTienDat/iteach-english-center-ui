import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StudentCreatePayload } from "../types/user";
import { createStudentApi, getAllStudentAvailableApi } from "../services/userServices";

export function useStudent() {
  const queryClient = useQueryClient();

  const studentsAvailableQuery = useQuery({
    queryKey: ["studentsAvailable"],
    queryFn: getAllStudentAvailableApi,
    staleTime: 1000 * 60 * 5, // cache 5 phút 
  });

  const createStudentMutation = useMutation({
    mutationFn: (payload: StudentCreatePayload) => createStudentApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["studentsAvailable"] });
    },
  });

  return {
    createStudentMutation,
    studentsAvailableQuery,
  };
}
