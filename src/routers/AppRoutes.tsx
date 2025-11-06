import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layout/PublicLayout';
import ManagerLayout from '../layout/ManagerLayout';
import TeacherLayout from '../layout/TeacherLayout';
import StudentLayout from '../layout/StudentLayout';
import ParentLayout from '../layout/ParentLayout';

// Pages

// Auth and Roles
import { USER_ROLES } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import AuthPage from '../features/authentication/AuthPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<AuthPage />} />
                <Route path="auth/login" element={<AuthPage />} />
            </Route>

            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={[USER_ROLES.MANAGER, USER_ROLES.ADMIN]}
                    />
                }
            >
                <Route path="manager" element={<ManagerLayout />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={USER_ROLES.TEACHER} />}>
                <Route path="teacher" element={<TeacherLayout />}>
                    <Route index element={<Navigate to="courses" replace />} />
                    {/* <Route path="courses" element={<CourseList />} /> */}
                </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={USER_ROLES.STUDENT} />}>
                <Route path="student" element={<StudentLayout />}>
                    <Route index element={<Navigate to="courses" replace />} />
                    {/* <Route path="courses" element={<CourseList />} /> */}
                </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={USER_ROLES.PARENT} />}>
                <Route path="parent" element={<ParentLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<h1>Parent Dashboard</h1>} />
                </Route>
            </Route>

            {/* Unauthorized Page */}
            <Route
                path="/unauthorized"
                element={
                    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                            <svg
                                className="w-20 h-20 text-red-500 mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                Access Denied
                            </h1>
                            <p className="text-gray-600 mb-6">
                                You don't have permission to access this page.
                            </p>
                            <button
                                onClick={() => window.history.back()}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                }
            />

            {/* 404 Not Found */}
            <Route
                path="*"
                element={
                    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                        <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
                        <button
                            onClick={() => (window.location.href = '/')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                        >
                            Go Home
                        </button>
                    </div>
                }
            />
        </Routes>
    );
};

export default AppRoutes;