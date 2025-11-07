import { endpoints } from "../utils/endPoint";
import { getAccessToken } from "../utils/token";
import { API, AUTH_REQUEST } from "../utils/axiosConfig";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    authenticated: boolean;
    token: string;
    user: User;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    roles: Array<{ roleName: string }>;
    [key: string]: any;
}

export async function loginApi(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
        const res = await API.post(endpoints.LOG_IN, credentials);

        if (res.status !== 200) {
            throw new Error(res.data?.message || "Login failed");
        }

        return res.data.result;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "An unexpected error occurred during login.");
    }
}

export async function logoutAPI(): Promise<void> {
    const res = await AUTH_REQUEST.post(
        endpoints.LOG_OUT,
        { token: getAccessToken() },
        { headers: { "Content-Type": "application/json" } }
    );

    if (res.status !== 200 && res.status !== 201) {
        throw new Error(res.data?.message || "Logout failed");
    }
}

export async function sentOTPApi(email: string): Promise<any> {
    try {
        const res = await API.post(endpoints.SEND_OTP, { email });
        if (res.status !== 200) {
            throw new Error(res.data?.message || "Sending OTP failed");
        }
        return res.data.result;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "An unexpected error occurred while sending OTP.");
    }
}

export async function verifyOTPApi(email: string, otp: string): Promise<string> {
    try {
        const res = await API.post(endpoints.VERIFY_OTP, { email, otp });
        if (res.status !== 200) {
            throw new Error(res.data?.message || "Verifying OTP failed");
        }
        return res.data.result;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "An unexpected error occurred while verifying OTP.");
    }
}

export async function resetPasswordApi(email: string, token: string, newPassword: string): Promise<any> {
    try {
        const res = await API.post(endpoints.RESET_PASSWORD, { email, token, newPassword });
        if (res.status !== 200) {
            throw new Error(res.data?.message || "Resetting password failed");
        }
        return res.data.result;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "An unexpected error occurred while resetting password.");
    }
}

export async function getCurrentUserApi(): Promise<User> {
    try {
        const res = await AUTH_REQUEST.get(endpoints.MY_INFO);
        if (res.status !== 200) {
            throw new Error(res.data?.message || "Fetching user info failed");
        }
        return res.data.result;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "An unexpected error occurred while fetching user info.");
    }
}
