import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  UsersRound, 
  UserCheck,
  DollarSign, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'User Account Management', icon: Users },
    { id: 'students', label: 'Student Management', icon: GraduationCap },
    { id: 'parents', label: 'Parent Management', icon: UserCheck },
    { id: 'courses', label: 'Course & Class Management', icon: BookOpen },
    { id: 'staff', label: 'Staff Management', icon: UsersRound },
    { id: 'finance', label: 'Finance & Reports', icon: DollarSign },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-[#2563EB] h-screen fixed left-0 top-0 shadow-md flex flex-col">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-white">English Center</h1>
        <p className="text-blue-100 text-sm mt-1">Admin Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-white text-[#2563EB] shadow-md'
                  : 'text-blue-100 hover:bg-blue-700'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm text-left">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
