import React from 'react';
import { Outlet } from 'react-router-dom';



const TeacherLayout: React.FC = () => {
    return (
        <div className="p-4 bg-yellow-50 min-h-screen">
            <h1 className="text-2xl font-bold text-yellow-700 border-b pb-2 mb-4">Teacher Layout (Header & Sidebar here)</h1>
            <Outlet />
        </div>
    );
};

export default TeacherLayout;