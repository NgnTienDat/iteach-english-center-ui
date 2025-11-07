import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getAccessToken, removeCookieToken } from '../utils/token';
import { getCurrentUserApi, type User } from '../services/authServices';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userRole: string;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const USER_ROLES = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT',
    PARENT: 'PARENT',
    GUEST: 'GUEST',
} as const;

// type RoleKey = keyof typeof USER_ROLES;

const getCurrentUserRole = (user: User | null): string => {
    if (!user || !user.roles || user.roles.length === 0) return USER_ROLES.GUEST;
    const role = user.roles[0].roleName;
    return role === USER_ROLES.ADMIN ? USER_ROLES.MANAGER : role;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAccessToken());
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const userRole = getCurrentUserRole(user);

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            setLoading(false);
            setIsAuthenticated(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const userData = await getCurrentUserApi();
                setUser(userData);
                setIsAuthenticated(true);
            } catch (err: any) {
                console.error("Failed to fetch current user:", err.message);
                removeCookieToken();
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = () => {
        removeCookieToken();
        setIsAuthenticated(false);
        setUser(null);
    };

    const value: AuthContextType = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loading,
        setLoading,
        userRole,
        logout,
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center text-gray-600">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === null) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
