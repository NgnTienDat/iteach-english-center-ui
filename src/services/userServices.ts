import type { User } from "../types/user";
import { AUTH_REQUEST } from "../utils/axiosConfig";
import { endpoints } from "../utils/endPoint";
import type { AxiosResponse } from "axios";

// ==== Define types ====




export interface ApiResponse<T> {
    code: number;
    message: string;
    result: T;
}


export async function getAllUsersApi(role?: string): Promise<User[]> {
    try {
        const res: AxiosResponse<ApiResponse<User[]>> = await AUTH_REQUEST.get(
            endpoints.ALL_USERS,
            {
                params: role ? { role } : {}, // 👈 thêm query param nếu có
            }
        );

        if (res.status !== 200 || res.data.code !== 200) {
            throw new Error(res.data?.message || "Fetching users failed");
        }

        return res.data.result;
    } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            throw new Error(
                axiosError.response?.data?.message ||
                "An unexpected error occurred while fetching users."
            );
        }

        throw new Error("An unexpected error occurred while fetching users.");
    }
}
