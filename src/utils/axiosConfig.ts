import axios from "axios";
import { getAccessToken } from "./token";

export const BASE_URL = "http://localhost:8080/";

export const API = axios.create({
    baseURL: BASE_URL,
});

export const AUTH_REQUEST = axios.create({
    baseURL: BASE_URL,
});

AUTH_REQUEST.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Uncomment when refreshToken is implemented
// AUTH_REQUEST.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 const newAccessToken = await refreshToken();
//                 originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return AUTH_REQUEST(originalRequest);
//             } catch (err) {
//                 removeCookieToken();
//                 window.location.href = "/auth/login";
//             }
//         }

//         return Promise.reject(error);
//     }
// );