import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    UserCircle,
    BookOpen,
    DollarSign,
    Settings,
    Bell,
    ChevronDown,
    Search
} from 'lucide-react';
// import { Input } from '../components/Input';
import useLogout from '../hooks/useLogout';
import { Dashboard } from '../components/Dashboard';

import { StudentManagement } from '../components/StudentManagement';
import { ParentManagement } from '../components/ParentManagement';
import { CourseManagement } from '../components/CourseManagement';
import { StaffManagement } from '../components/StaffManagement';
import { FinanceManagement } from '../components/FinanceManagement';
import { Input } from '../components/ui/input';
import { UserManagement } from '../features/admin/users/UserManagement';
// import { Dashboard } from '../components_/Dashboard';
// import { UserManagement } from '../components_/UserManagement';
// import { StudentManagement } from '../components_/StudentManagement';
// import { ParentManagement } from '../components_/ParentManagement';
// import { CourseManagement } from '../components_/CourseManagement';
// import { StaffManagement } from '../components_/StaffManagement';
// import { FinanceManagement } from '../components_/FinanceManagement';

// Import các trang con
// import DashboardHome from '../modules/manager/dashboard/DashboardHome';
// import UserManagement from '../modules/manager/users/UserManagement';
// import StudentManagement from '../modules/manager/students/StudentManagement';
// import ParentManagement from '../modules/manager/parents/ParentManagement';
// import StaffManagement from '../modules/manager/staff/StaffManagement';
// import CourseManagement from '../modules/manager/courses-class/CourseManagement';
// import FinanceManagement from '../modules/manager/reports/FinanceManagement';

interface MenuItem {
    icon: React.ElementType;
    label: string;
    id: string;
}

interface User {
    fullName: string;
    email: string;
    avatar: string | null;
}

const ManagerLayout: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>('overview');
    const { logout } = useLogout();

    const user: User = {
        fullName: 'Admin',
        email: 'admin@example.com',
        avatar: null,
    };

    const handleLogout = () => {
        logout();
    };

    const menuItems: MenuItem[] = [
        { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
        { icon: Users, label: 'User Account Management', id: 'users' },
        { icon: GraduationCap, label: 'Student Management', id: 'students' },
        { icon: UserCircle, label: 'Parent Management', id: 'parents' },
        { icon: BookOpen, label: 'Course & Class Management', id: 'courses' },
        { icon: Users, label: 'Staff Management', id: 'staff' },
        { icon: DollarSign, label: 'Finance & Reports', id: 'finance' },
        { icon: Settings, label: 'System Settings', id: 'settings' },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return <Dashboard />;
            case 'users':
                return <UserManagement />;
            case 'students':
                return <StudentManagement />;
            case 'parents':
                return <ParentManagement />;
            case 'courses':
                return <CourseManagement />;
            case 'staff':
                return <StaffManagement />;
            case 'finance':
                return <FinanceManagement />;
            case 'settings':
                return <div>System Settings</div>;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-72 bg-[#2563EB] h-screen fixed left-0 top-0 shadow-md flex flex-col">
                <div className="p-6 border-b border-blue-700">
                    <h2 className="text-white text-2xl font-bold">iTeach English</h2>
                    <p className="text-blue-100 text-sm mt-1">Admin Dashboard</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                       return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-white text-[#2563EB] shadow-md scale-[1.02]'
                                    : 'text-blue-100 hover:bg-blue-700'
                                    }`}
                            >
                                <Icon
                                    size={22}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className="shrink-0"
                                />
                                <span className="text-sm text-left">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col grow overflow-hidden">
                <header className="fixed top-0 left-72 right-0 bg-white border-b border-gray-200 h-20 z-10">
                    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-96 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-[#2563EB] pl-10"
                                />
                                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-gray-100 rounded-full relative">
                                <Bell size={20} className="text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl transition"
                                >
                                    <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-semibold">
                                        {user.fullName?.charAt(0) || 'A'}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs text-gray-500">Hello,</p>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {user.fullName || 'Admin'}
                                        </p>
                                    </div>
                                    <ChevronDown
                                        size={16}
                                        className={`text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsDropdownOpen(false)}
                                        ></div>
                                        <div className="absolute right-0 mt-2 w-48 bg-white font-semibold rounded-lg shadow-lg border border-gray-200 space-y-1 p-2 z-20">
                                            <button
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="block w-full rounded-md text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                                            >
                                                Profile
                                            </button>
                                            <button
                                                onClick={() => setActiveSection('settings')}
                                                className="block w-full rounded-md text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                                            >
                                                Settings
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full rounded-md text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                 <main className="ml-72 pt-20 min-h-screen flex flex-col overflow-y-auto">
                    <div className="flex-1 p-8">{renderContent()}</div>
                    <footer className="bg-white border-t border-gray-200 py-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                © 2025 English Center Pro Admin Panel
                            </p>
                            <div className="mt-2 flex items-center justify-center gap-4">
                                <a href="#" className="text-sm text-[#2563EB] hover:underline">
                                    Privacy Policy
                                </a>
                                <span className="text-gray-400">|</span>
                                <a href="#" className="text-sm text-[#2563EB] hover:underline">
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default ManagerLayout;
