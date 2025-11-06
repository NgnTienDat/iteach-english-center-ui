import { Search, Bell } from 'lucide-react';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Header() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 fixed top-0 right-0 left-72 z-10 shadow-sm">
      <div className="h-full px-8 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search students, courses..."
              className="pl-10 rounded-xl border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB]"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-gray-500">Hello,</p>
              <p className="text-sm">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
