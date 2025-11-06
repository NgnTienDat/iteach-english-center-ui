import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Edit, Trash2, Search, Eye, Users } from 'lucide-react';
import { EditParentModal } from './EditParentModal';
import { ParentDetailModal } from './ParentDetailModal';

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  relationship: string;
  occupation: string;
  linkedStudents: string[];
  studentNames: string[];
  registrationDate: string;
  status: 'active' | 'inactive';
}

const mockParents: Parent[] = [
  {
    id: 'P001',
    name: 'Nguyen Van Nam',
    email: 'nam.nguyen@email.com',
    phone: '0901234567',
    address: '123 Nguyen Hue St., District 1, HCMC',
    relationship: 'Father',
    occupation: 'Engineer',
    linkedStudents: ['S001'],
    studentNames: ['Nguyen Minh Anh'],
    registrationDate: '01/15/2024',
    status: 'active',
  },
  {
    id: 'P002',
    name: 'Tran Thi Mai',
    email: 'mai.tran@email.com',
    phone: '0912345678',
    address: '456 Le Loi St., District 3, HCMC',
    relationship: 'Mother',
    occupation: 'Teacher',
    linkedStudents: ['S002'],
    studentNames: ['Tran Hoang Long'],
    registrationDate: '01/20/2024',
    status: 'active',
  },
  {
    id: 'P003',
    name: 'Le Van Hung',
    email: 'hung.le@email.com',
    phone: '0923456789',
    address: '789 Vo Van Tan St., District 3, HCMC',
    relationship: 'Father',
    occupation: 'Doctor',
    linkedStudents: ['S003'],
    studentNames: ['Le Thi Thu'],
    registrationDate: '02/10/2024',
    status: 'active',
  },
  {
    id: 'P004',
    name: 'Pham Thi Lan',
    email: 'lan.pham@email.com',
    phone: '0934567890',
    address: '321 Tran Hung Dao St., District 5, HCMC',
    relationship: 'Mother',
    occupation: 'Business Owner',
    linkedStudents: ['S004', 'S005'],
    studentNames: ['Pham Quoc Anh', 'Pham Minh Chau'],
    registrationDate: '02/05/2024',
    status: 'active',
  },
  {
    id: 'P005',
    name: 'Hoang Van Duc',
    email: 'duc.hoang@email.com',
    phone: '0945678901',
    address: '654 Cach Mang Thang 8 St., District 10, HCMC',
    relationship: 'Father',
    occupation: 'Lawyer',
    linkedStudents: ['S006'],
    studentNames: ['Hoang Minh Tuan'],
    registrationDate: '02/18/2024',
    status: 'active',
  },
  {
    id: 'P006',
    name: 'Vu Thi Huong',
    email: 'huong.vu@email.com',
    phone: '0956789012',
    address: '147 Pasteur St., District 1, HCMC',
    relationship: 'Mother',
    occupation: 'Office Worker',
    linkedStudents: ['S007'],
    studentNames: ['Vu Thanh Tung'],
    registrationDate: '02/25/2024',
    status: 'inactive',
  },
];

export function ParentManagement() {
  const [parents, setParents] = useState<Parent[]>(mockParents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [viewingParent, setViewingParent] = useState<Parent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const filteredParents = parents.filter((parent) => {
    const matchesSearch =
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.phone.includes(searchTerm) ||
      parent.studentNames.some((name) => name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || parent.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddParent = () => {
    setIsAddMode(true);
    setEditingParent(null);
    setIsEditModalOpen(true);
  };

  const handleEditParent = (parent: Parent) => {
    setIsAddMode(false);
    setEditingParent(parent);
    setIsEditModalOpen(true);
  };

  const handleViewParent = (parent: Parent) => {
    setViewingParent(parent);
    setIsDetailModalOpen(true);
  };

  const handleSaveParent = (parentData: Partial<Parent>) => {
    if (isAddMode) {
      const newParent: Parent = {
        id: `P${String(parents.length + 1).padStart(3, '0')}`,
        name: parentData.name || '',
        email: parentData.email || '',
        phone: parentData.phone || '',
        address: parentData.address || '',
        relationship: parentData.relationship || '',
        occupation: parentData.occupation || '',
        linkedStudents: parentData.linkedStudents || [],
        studentNames: parentData.studentNames || [],
        registrationDate: new Date().toLocaleDateString('en-US'),
        status: 'active',
      };
      setParents([...parents, newParent]);
    } else if (editingParent) {
      setParents(
        parents.map((p) =>
          p.id === editingParent.id ? { ...p, ...parentData } : p
        )
      );
    }
  };

  const handleDeleteParent = (id: string) => {
    if (confirm('Are you sure you want to delete this parent?')) {
      setParents(parents.filter((parent) => parent.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Parent Management</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage parent information and link with students
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search parents, students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-gray-300 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 whitespace-nowrap min-w-[80px]">Status:</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-52 rounded-xl border-gray-300 shadow-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={handleAddParent}
          className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Parent
        </Button>
      </div>

      <Card className="p-6 rounded-xl shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parent ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Relationship</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Linked Students</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParents.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>{parent.id}</TableCell>
                <TableCell>{parent.name}</TableCell>
                <TableCell className="text-sm text-gray-600">{parent.email}</TableCell>
                <TableCell className="text-sm">{parent.phone}</TableCell>
                <TableCell className="text-sm">{parent.relationship}</TableCell>
                <TableCell className="text-sm">{parent.occupation}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-lg">
                      <Users className="w-3 h-3 mr-1" />
                      {parent.linkedStudents.length} student{parent.linkedStudents.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{parent.registrationDate}</TableCell>
                <TableCell>
                  <Badge
                    className={`rounded-lg ${
                      parent.status === 'active'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {parent.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewParent(parent)}
                      className="rounded-xl hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1.5" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditParent(parent)}
                      className="rounded-xl hover:bg-blue-50 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-1.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteParent(parent.id)}
                      className="rounded-xl hover:bg-red-50 hover:border-red-500 text-red-600 border-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1.5" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <EditParentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        parent={editingParent}
        onSave={handleSaveParent}
        isAddMode={isAddMode}
      />

      <ParentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        parent={viewingParent}
      />
    </div>
  );
}
