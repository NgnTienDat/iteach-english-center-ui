import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createParentApi, getAllParentsApi } from "../services/userServices";
import type { Parent, ParentFormData } from "../types/Parent";

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
      // refresh danh sách parents
      queryClient.invalidateQueries({ queryKey: ["parents"] });

      // refresh students list (vì khi tạo parent thì student sẽ gán vào parent)
      queryClient.invalidateQueries({ queryKey: ["studentsAvailable"] });
    },
  });

  return {
    parentsQuery,
    createParentMutation,
  };
}
