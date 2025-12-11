import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { AddStaffModal } from './AddStaffModal';
import type { StaffResponse } from '../../../types/user';
import { useTeacher } from '../../../hooks/useTeacher';
import { useUser } from '../../../hooks/useUser';
import { EditStaffModal } from '@/features/admin/staffs/EditStaffModal';




export function StaffManagement() {
  const { deleteUser, isDeleting } = useUser();

  const { teachersQuery } = useTeacher();

  const { data: teachers } = teachersQuery;
  const [searchTeacher, setSearchTeacher] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [editingStaff, setEditingStaff] = useState<StaffResponse | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<'teacher' | 'staff'>('teacher');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addType, setAddType] = useState<'teacher' | 'staff'>('teacher');

  // const filteredTeachers = teachers?.filter((teacher) => {
  //   const matchesSearch =
  //     teacher.fullName.toLowerCase().includes(searchTeacher.toLowerCase()) ||
  //     teacher.email.toLowerCase().includes(searchTeacher.toLowerCase());
  //   const matchesDept = filterTeacherDept === 'all' || teacher.department === filterTeacherDept;
  //   return matchesSearch && matchesDept;
  // });

  const filteredTeachers = teachers?.filter((teacher) => {
    const matchesSearch =
      teacher.fullName.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      teacher.phoneNumber.toLowerCase().includes(searchTeacher.toLowerCase());

    const matchesPosition = positionFilter === 'all' || teacher.position === positionFilter;

    return matchesSearch && matchesPosition;
  });

  const handleEditTeacher = (teacher: StaffResponse) => {
    setEditingStaff(teacher);
    setEditType('teacher');
    setIsEditModalOpen(true);
  };



  const handleDeleteTeacher = (id: string) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      deleteUser(id);
    }
  };




  const handleAddTeacher = () => {
    setAddType('teacher');
    setIsAddModalOpen(true);
  };



  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Teacher Management</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage teacher information at the center
        </p>
      </div>



      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search teachers..."
              value={searchTeacher}
              onChange={(e) => setSearchTeacher(e.target.value)}
              className="pl-10 rounded-xl border-gray-300 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 whitespace-nowrap min-w-[70px]">Department:</label>

            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-[220px] rounded-xl border-gray-300 shadow-sm">
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="IELTS Teacher">IELTS Teacher</SelectItem>
                <SelectItem value="TOEIC Teacher">TOEIC Teacher</SelectItem>
                <SelectItem value="Business English Teacher">Business English Teacher</SelectItem>
                <SelectItem value="Kids Teacher">Kids Teacher</SelectItem>
                <SelectItem value="General English Teacher">General English Teacher</SelectItem>
                <SelectItem value="Senior Teacher">Senior Teacher</SelectItem>
                <SelectItem value="Part-time Teacher">Part-time Teacher</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={handleAddTeacher}
          className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>
      <div className="space-y-6 mt-6">

        {/* <Card className="p-6 rounded-xl shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F0F4FF] hover:bg-[#F0F4FF] border-b border-gray-200">
                <TableHead>Full Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers?.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.fullName}</TableCell>
                  <TableCell className="text-sm">{teacher.position}</TableCell>
                  <TableCell className="text-sm text-gray-600">{teacher.email}</TableCell>
                  <TableCell>
                    <Badge className="rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-100">
                      {teacher.phoneNumber}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={teacher.active ? 'default' : 'secondary'}
                      className={`rounded-lg ${teacher.active
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : ''
                        }`}
                    >
                      {teacher.active ? 'Active' : 'On Leave'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTeacher(teacher)}
                        className="rounded-xl hover:bg-blue-50 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-1.5" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTeacher(teacher.id)}
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
        </Card> */}
        <Card className="p-6 rounded-xl shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F0F4FF] hover:bg-[#F0F4FF] border-b border-gray-200">
                <TableHead>Full Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers?.map((teacher) => (
                <TableRow key={teacher.id} className="hover:bg-[#F8FAFE] transition-colors border-b border-gray-100">
                  <TableCell className="font-medium">{teacher.fullName}</TableCell>
                  <TableCell className="text-sm">{teacher.position}</TableCell>
                  <TableCell className="text-sm text-gray-600">{teacher.email}</TableCell>
                  <TableCell>
                    <Badge className="rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-100">
                      {teacher.phoneNumber}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`rounded-lg ${teacher.active
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {teacher.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-start gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTeacher(teacher)}
                        className="rounded-xl hover:bg-blue-50 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-1.5" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTeacher(teacher.id)}
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
      </div>



      <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        staff={editingStaff}
      />

      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        type={addType}
      />
    </div>
  );
}
