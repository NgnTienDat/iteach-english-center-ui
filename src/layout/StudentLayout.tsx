import React from 'react';
import { Outlet } from 'react-router-dom';
import useLogout from '../hooks/useLogout';


const StudentLayout: React.FC = () => {
    const { logout } = useLogout();

    const handleLogout = () => {
        logout(); 
    };
    return (
        <div className="p-4 bg-blue-50 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-700 border-b pb-2 mb-4">Student Layout (Header & Sidebar here)</h1>
            <button
                onClick={handleLogout}
                className="block w-full rounded-md text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
                Đăng xuất
            </button>
            <Outlet />
        </div>
    );
};

export default StudentLayout;
