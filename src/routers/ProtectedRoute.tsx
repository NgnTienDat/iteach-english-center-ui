import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    /** Single role string or array of allowed role strings */
    allowedRoles?: string | string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { isAuthenticated, userRole, loading } = useAuth();

    // Convert allowedRoles to an array for easy checking
    const roles = allowedRoles
        ? Array.isArray(allowedRoles)
            ? allowedRoles
            : [allowedRoles]
        : [];

    if (loading) {
        // Show a loading indicator while checking auth status
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
                    <p className="text-xl text-gray-600">Loading authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // 1. Not authenticated: Redirect to login page
        return <Navigate to="/auth/login" replace />;
    }

    // 2. Authenticated but unauthorized role
    // Note: userRole is already mapped (ADMIN to MANAGER) in AuthContext
    if (roles.length > 0 && !roles.includes(userRole)) {
        console.warn(
            `Access denied. User role: ${userRole}, Required roles: ${roles.join(', ')}`
        );
        return <Navigate to="/unauthorized" replace />;
    }

    // 3. Authenticated and authorized: Render child routes
    return <Outlet />;
};

export default ProtectedRoute;
