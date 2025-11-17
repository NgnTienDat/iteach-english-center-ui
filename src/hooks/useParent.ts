import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createParentApi, getAllParentsApi, updateParentApi } from "../services/userServices";
import type { ParentFormData } from "../types/Parent";

export function useParent() {
  const queryClient = useQueryClient();

  // GET all parents
  const parentsQuery = useQuery({
    queryKey: ["parents"],
    queryFn: getAllParentsApi,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });

  // CREATE parent
  const createParentMutation = useMutation({
    mutationFn: (payload: Partial<ParentFormData>) => createParentApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parents"] });
      queryClient.invalidateQueries({ queryKey: ["studentsAvailable"] });
    },
  });

  // UPDATE parent
  const updateParentMutation = useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: Partial<ParentFormData> }) =>
      updateParentApi(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parents"] });
      queryClient.invalidateQueries({ queryKey: ["studentsAvailable"] });
    },
  });

  return {
    parentsQuery,
    createParentMutation,
    updateParentMutation,
  };
}
