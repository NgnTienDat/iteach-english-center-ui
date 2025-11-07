import { AUTH_REQUEST } from "../utils/axiosConfig";
import { endpoints } from "../utils/endPoint";

export async function getAllUsersApi(): Promise<any[]> {
    try {
        const res = await AUTH_REQUEST.get(endpoints.ALL_USERS);
        if (res.status !== 200) {
            throw new Error(res.data?.message || "Fetching users failed");
        }
        return res.data.result;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "An unexpected error occurred while fetching users.");
    }
}
