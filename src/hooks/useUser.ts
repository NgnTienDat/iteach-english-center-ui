import { useQuery } from "@tanstack/react-query";
import { getAllUsersApi } from "../services/userServices";
import type { User } from "../types/user";

export function useUser(role?: string) {
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

    return {
        users,
        isLoading,
        isError,
        error,
        refetch,
    };
}
