import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { UserModal } from './UserModal';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'Nguyen Van An', email: 'nguyenvanan@gmail.com', role: 'Student', status: 'active' },
  { id: 2, name: 'Tran Thi Binh', email: 'tranthiminh@gmail.com', role: 'Student', status: 'active' },
  { id: 3, name: 'Sarah Johnson', email: 'sarah.j@englishcenter.com', role: 'Teacher', status: 'active' },
  { id: 4, name: 'David Lee', email: 'david.lee@englishcenter.com', role: 'Teacher', status: 'active' },
  { id: 5, name: 'Le Hoang Nam', email: 'lehoangnam@gmail.com', role: 'Staff', status: 'active' },
  { id: 6, name: 'Pham Thu Ha', email: 'phamthuha@gmail.com', role: 'Parent', status: 'active' },
  { id: 7, name: 'Emma Wilson', email: 'emma.w@englishcenter.com', role: 'Teacher', status: 'inactive' },
  { id: 8, name: 'Dang Quoc Tuan', email: 'dangquoctuan@gmail.com', role: 'Student', status: 'active' },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSaveUser = (userData: Omit<User, 'id' | 'status'>) => {
    if (editingUser) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userData }
          : user
      ));
    } else {
      // Add new user
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userData,
        status: 'active'
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Teacher':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'Staff':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'Student':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'Parent':
        return 'bg-amber-100 text-amber-700 hover:bg-amber-100';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">User Account Management</h2>
          <p className="text-sm text-gray-600 mt-1">Manage account information for students, teachers, staff and parents</p>
        </div>
        <Button 
          onClick={handleAddUser}
          className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Account
        </Button>
      </div>

      <Card className="p-6 rounded-xl shadow-md">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl border-gray-300"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 whitespace-nowrap">Role:</label>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48 rounded-xl border-gray-300">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
                <SelectItem value="Teacher">Teacher</SelectItem>
                <SelectItem value="Parent">Parent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-sm text-gray-600">{user.email}</TableCell>
                <TableCell>
                  <Badge className={`rounded-lg ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={user.status === 'active' ? 'default' : 'secondary'}
                    className={`rounded-lg ${user.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}`}
                  >
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditUser(user)}
                      className="rounded-lg hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="rounded-lg hover:bg-red-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
      />
    </div>
  );
}
