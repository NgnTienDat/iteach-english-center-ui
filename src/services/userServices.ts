import type { Parent, ParentFormData } from "../types/Parent";
import type { StudentCreatePayload, StudentDetail, StudentParams, StudentResponse, User } from "../types/user";
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
                params: role ? { role } : {},
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


export async function getAllStudentsApi(params: Partial<StudentParams>): Promise<StudentResponse[]> {
    try {
        const res: AxiosResponse<ApiResponse<StudentResponse[]>> = await AUTH_REQUEST.get(
            endpoints.ALL_STUDENTS,
            {
                params: params,
            }
        );

        if (res.status !== 200 || res.data.code !== 200) {
            throw new Error(res.data?.message || "Fetching students failed");
        }

        return res.data.result;
    } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            throw new Error(
                axiosError.response?.data?.message ||
                "An unexpected error occurred while fetching students."
            );
        }

        throw new Error("An unexpected error occurred while fetching users.");
    }
}

export async function createStudentApi(payload: StudentCreatePayload): Promise<void> {
    try {
        const res = await AUTH_REQUEST.post(endpoints.CREATE_STUDENT, payload);

        if (res.status !== 201 && res.status !== 200) {
            throw new Error(res.data?.message || "Creating student failed");
        }
    } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            throw new Error(
                axiosError.response?.data?.message ||
                "An unexpected error occurred while creating student."
            );
        }
        throw new Error("An unexpected error occurred while creating student.");
    }
}

export async function getAllStudentAvailableApi(): Promise<User[]> {
    try {
        const res: AxiosResponse<ApiResponse<User[]>> = await AUTH_REQUEST.get(
            endpoints.ALL_STUDENTS_AVAILABLE
        );
        if (res.status !== 200 || res.data.code !== 200) {
            throw new Error(res.data?.message || "Fetching available students failed");
        }
        return res.data.result;
    } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            throw new Error(
                axiosError.response?.data?.message ||
                "An unexpected error occurred while fetching available students."
            );
        }
        throw new Error("An unexpected error occurred while fetching available students.");
    }
}

export async function createParentApi(payload: Partial<ParentFormData>): Promise<void> {    
    try {
        const res = await AUTH_REQUEST.post(endpoints.CREATE_PARENT, payload);
        if (res.status !== 201 && res.status !== 200) {
            throw new Error(res.data?.message || "Creating parent failed");
        }
    } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            throw new Error(
                axiosError.response?.data?.message ||
                "An unexpected error occurred while creating parent."
            );
        }
        throw new Error("An unexpected error occurred while creating parent.");
    }
}

export async function getAllParentsApi(): Promise<Parent[]> {
    try {
        const res: AxiosResponse<ApiResponse<Parent[]>> = await AUTH_REQUEST.get(
            endpoints.ALL_PARENTS
        );
        if (res.status !== 200 || res.data.code !== 200) {
            throw new Error(res.data?.message || "Fetching parents failed");
        }
        return res.data.result;
    } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            throw new Error(
                axiosError.response?.data?.message ||
                "An unexpected error occurred while fetching parents."
            );
        }
        throw new Error("An unexpected error occurred while fetching parents.");
    }
}

export async function updateParentApi(userId: string, payload: Partial<ParentFormData>): Promise<void> {
    try {
        const res = await AUTH_REQUEST.patch(
            endpoints.UPDATE_PARENT(userId),
            payload
        );
        if (res.status !== 200) {
            throw new Error(res.data?.message || "Updating parent failed");
        }
    } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            throw new Error(
                axiosError.response?.data?.message ||
                "An unexpected error occurred while updating parent."
            );
        }
        throw new Error("An unexpected error occurred while updating parent.");
    }
}


export async function getStudentDetailApi(userId: string): Promise<StudentDetail> {
    try {
        const res = await AUTH_REQUEST.get(
            endpoints.STUDENT_DETAIL(userId)
        );
        if (res.status !== 200) {
            throw new Error(res.data?.message || "Fetching student detail failed");
        }
        return res.data.result;
    } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            throw new Error(
                axiosError.response?.data?.message ||
                "An unexpected error occurred while Fetching student detail."
            );
        }
        throw new Error("An unexpected error occurred while Fetching student detail.");
    }
}