import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllUsersApi,
    deleteUserApi,
    getAllUnlinkedUsersApi,
    createUserAccountApi,
    updateUserApi,
    getAllUsersPageApi
} from "../services/userServices";
import type { User } from "../types/user";
import type { UserCreatePayload } from "../types/user";
import { toast } from "react-toastify";
import type { PageResponse } from "@/types/common";

interface UseParamOptions {
    role?: string;
    page?: number;
    size?: number;
}

export function useUser(options?: UseParamOptions) {
    const queryClient = useQueryClient();

    /**
     * 1. GET USERS 
     */
    const {
        data: users,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<User[], Error>({
        queryKey: ["users", options?.role],
        queryFn: () => getAllUsersApi(options?.role),
    });


    /**
     * 2. GET USERS PAGE 
     */
    const {
        data: usersPage,
        isLoading: isLoadingPage,
        isError: isErrorPage,
        error: errorPage,
        refetch: refetchPage,
    } = useQuery<PageResponse<User>, Error>({
        queryKey: ["users-page", options?.role, options?.page, options?.size],
        queryFn: () => getAllUsersPageApi(options?.role, options?.page ?? 0, options?.size ?? 10),
        enabled: options?.page !== undefined && options?.size !== undefined, // optional
    });


    /**
     * 3. GET USERS UNLINKED
     */
    const {
        data: usersUnlinked,
        isLoading: isLoadingUnlinked,
        isError: isErrorUnlinked,
        error: errorUnlinked,
        refetch: refetchUnlinked,
    } = useQuery<User[], Error>({
        queryKey: ["users-unlinked", options?.role],
        queryFn: () => getAllUnlinkedUsersApi(options?.role || "student"),
    });


    /**
     * 4. CREATE USER
     */
    const { mutate: createUser, isPending: isCreating } = useMutation({
        mutationFn: (payload: UserCreatePayload) => createUserAccountApi(payload),
        onSuccess: () => {
            toast.success("User created successfully");

            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["users-page"] });
            queryClient.invalidateQueries({ queryKey: ["users-unlinked"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create user");
        },
    });


    /**
     * 5. DELETE USER
     */
    const { mutate: deleteUser, isPending: isDeleting } = useMutation({
        mutationFn: (userId: string) => deleteUserApi(userId),
        onSuccess: () => {
            toast.success("User deleted successfully");

            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["users-page"] });
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            queryClient.invalidateQueries({ queryKey: ["staffs"] });
            queryClient.invalidateQueries({ queryKey: ["users-unlinked"] });
        },
        onError: (error: Error) => {
            console.error(error.message);
        },
    });


    /**
     * 6. UPDATE USER
     */
    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: ({ userId, payload }: { userId: string; payload: Partial<UserCreatePayload> }) =>
            updateUserApi(userId, payload),
        onSuccess: () => {
            toast.success("User updated successfully");

            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["users-page"] });
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            queryClient.invalidateQueries({ queryKey: ["staffs"] });
            queryClient.invalidateQueries({ queryKey: ["users-unlinked"] });
        },
        onError: (error: Error) => {
            console.error(error.message);
        },
    });


    return {
        // old
        users,
        isLoading,
        isError,
        error,
        refetch,

        // paging version
        usersPage,
        isLoadingPage,
        isErrorPage,
        errorPage,
        refetchPage,

        // unlinked
        usersUnlinked,
        isLoadingUnlinked,
        isErrorUnlinked,
        errorUnlinked,
        refetchUnlinked,

        // mutations
        deleteUser,
        isDeleting,

        createUser,
        isCreating,

        updateUser,
        isUpdating,
    };
}
