import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TeacherCreatePayload } from "../types/user";
import { createStaffApi, getAllStaffsApi, getAllTeachersApi } from "../services/userServices";

export function useTeacher() {
  const queryClient = useQueryClient();

  const teachersQuery = useQuery({
    queryKey: ["teachers"],
    queryFn: getAllTeachersApi,
  });


  const staffsQuery = useQuery({
    queryKey: ["staffs"],
    queryFn: getAllStaffsApi,
  });

  const createTeacherMutation = useMutation({
    mutationFn: (payload: TeacherCreatePayload) => createStaffApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });

  const createStaffMutation = useMutation({
    mutationFn: (payload: TeacherCreatePayload) => createStaffApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
  });

  return {
    teachersQuery,
    staffsQuery,
    createTeacherMutation,
    createStaffMutation
  };
}
