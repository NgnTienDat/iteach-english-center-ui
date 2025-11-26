import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsersApi, deleteUserApi } from "../services/userServices";
import type { User } from "../types/user";
import { toast } from "react-toastify";

export function useUser(role?: string) {
    const queryClient = useQueryClient();

    // GET ALL USERS
    const {
        data: users,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<User[], Error>({
        queryKey: ["users", role],
        queryFn: () => getAllUsersApi(role),
    });

    // DELETE USER
    const { mutate: deleteUser, isPending: isDeleting } = useMutation({
        mutationFn: (userId: string) => deleteUserApi(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            queryClient.invalidateQueries({ queryKey: ["staffs"] });
            toast.success("User deleted successfully");
        },
        onError: (error: Error) => {
            console.error(error.message);
        },
    });

    return {
        users,
        isLoading,
        isError,
        error,
        refetch,
        deleteUser,
        isDeleting,
    };
}
