import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TeacherCreatePayload } from "../types/user";
import { createStaffApi, getAllStaffsApi, getAllTeachersApi, updateTeacherApi } from "../services/userServices";
import { toast } from "sonner";

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



  // UPDATE TEACHER
  const { mutate: updateTeacher, isPending: isUpdating } = useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: Partial<TeacherCreatePayload> }) => updateTeacherApi(userId, payload),
    onSuccess: () => {
      toast.success("Teacher updated successfully");

      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    teachersQuery,
    staffsQuery,
    createTeacherMutation,
    createStaffMutation,
    updateTeacher,
    isUpdating
  };
}
