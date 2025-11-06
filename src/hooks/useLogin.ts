import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setCookieToken } from '../utils/token';
import { useState } from 'react';
import { loginApi, type LoginCredentials, type LoginResponse } from '../services/authServices';
import { useAuth } from '../contexts/AuthContext';

const useLogin = () => {
    const navigate = useNavigate();
    const [customError, setCustomError] = useState<string | null>(null);
    const { setIsAuthenticated, setUser } = useAuth();

    const { mutate, isPending } = useMutation<LoginResponse, Error, LoginCredentials>({
        mutationFn: async (credentials) => {
            const timeoutPromise = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('Network timeout')), 10000)
            );
            return Promise.race([loginApi(credentials), timeoutPromise]);
        },

        onSuccess: (data) => {
            setCookieToken(data.token);
            setUser(data.user);
            setIsAuthenticated(true);

            const role = data.user.roles?.[0]?.roleName;
            let targetPath = '/';

            switch (role) {
                case 'ADMIN':
                case 'MANAGER':
                    targetPath = '/manager';
                    break;
                case 'TEACHER':
                    targetPath = '/teacher/courses';
                    break;
                case 'STUDENT':
                    targetPath = '/student/courses';
                    break;
                case 'PARENT':
                    targetPath = '/parent/dashboard';
                    break;
                default:
                    targetPath = '/unauthorized';
                    break;
            }

            setCustomError(null);
            navigate(targetPath, { replace: true });
        },

        onError: (err) => {
            console.error("Login failed:", err.message);
            if (err.message === 'Network timeout') {
                setCustomError('Network error: The request took too long. Please check your connection.');
            } else {
                setCustomError('Email or password is incorrect, please try again!');
            }
        },
    });

    const clearError = () => setCustomError(null);

    return {
        login: mutate,
        isPending,
        error: customError,
        clearError,
    };
};

export default useLogin;