import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { EditStaffModal } from './EditStaffModal';
import { AddStaffModal } from './AddStaffModal';
import type { Staff, StaffResponse } from '../../../types/user';
import { useTeacher } from '../../../hooks/useTeacher';




export function StaffManagement() {
  const [activeView, setActiveView] = useState<'teachers' | 'staff'>('teachers');
  // const [teachers, setTeachers] = useState<Staff[]>(mockTeachers);

  const { teachersQuery, staffsQuery } = useTeacher();

  const { data: teachers } = teachersQuery;
  const { data: staffs } = staffsQuery;

  // const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [searchTeacher, setSearchTeacher] = useState('');
  const [searchStaff, setSearchStaff] = useState('');
  const [filterTeacherDept, setFilterTeacherDept] = useState('all');
  const [filterStaffDept, setFilterStaffDept] = useState('all');
  const [editingStaff, setEditingStaff] = useState<StaffResponse | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<'teacher' | 'staff'>('teacher');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addType, setAddType] = useState<'teacher' | 'staff'>('teacher');

  const filteredTeachers = teachers?.filter((teacher) => {
    const matchesSearch =
      teacher.fullName.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTeacher.toLowerCase());
    const matchesDept = filterTeacherDept === 'all' || teacher.department === filterTeacherDept;
    return matchesSearch && matchesDept;
  });

  const filteredStaff = staffs?.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchStaff.toLowerCase()) ||
      member.email.toLowerCase().includes(searchStaff.toLowerCase());
    const matchesDept = filterStaffDept === 'all' || member.department === filterStaffDept;
    return matchesSearch && matchesDept;
  });

  const handleEditTeacher = (teacher: StaffResponse) => {
    setEditingStaff(teacher);
    setEditType('teacher');
    setIsEditModalOpen(true);
  };

  const handleEditStaffMember = (member: StaffResponse) => {
    setEditingStaff(member);
    setEditType('staff');
    setIsEditModalOpen(true);
  };

  // const handleSaveStaff = (updatedStaff: Staff) => {
  //   if (editType === 'teacher') {
  //     setTeachers(teachers.map((t) => (t.id === updatedStaff.id ? updatedStaff : t)));
  //   } else {
  //     setStaff(staff.map((s) => (s.id === updatedStaff.id ? updatedStaff : s)));
  //   }
  // };

  // const handleDeleteTeacher = (id: number) => {
  //   setTeachers(teachers.filter((teacher) => teacher.id !== id));
  // };

  // const handleDeleteStaff = (id: number) => {
  //   setStaff(staff.filter((member) => member.id !== id));
  // };

  const handleAddTeacher = () => {
    setAddType('teacher');
    setIsAddModalOpen(true);
  };

  const handleAddStaff = () => {
    setAddType('staff');
    setIsAddModalOpen(true);
  };

  // const handleSaveNewStaff = (newStaff: Omit<Staff, 'id'>) => {
  //   if (addType === 'teacher') {
  //     const newId = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
  //     setTeachers([...teachers, { ...newStaff, id: newId }]);
  //   } else {
  //     const newId = staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1;
  //     setStaff([...staff, { ...newStaff, id: newId }]);
  //   }
  // };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Staff Management</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage teacher and staff information at the center
        </p>
      </div>

      <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-md w-fit">
        <Button
          variant={activeView === 'teachers' ? 'default' : 'ghost'}
          onClick={() => setActiveView('teachers')}
          className={`rounded-l-xl px-6 py-3 transition-all ${activeView === 'teachers'
            ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
            : 'hover:bg-gray-100 hover:text-[#2563EB]'
            }`}
        >
          Teachers
        </Button>
        <Button
          variant={activeView === 'staff' ? 'default' : 'ghost'}
          onClick={() => setActiveView('staff')}
          className={`rounded-r-xl px-6 py-3 transition-all ${activeView === 'staff'
            ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
            : 'hover:bg-gray-100 hover:text-[#2563EB]'
            }`}
        >
          Center Staff
        </Button>
      </div>

      {activeView === 'teachers' && (
        <div className="space-y-6 mt-6">
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
                <Select value={filterTeacherDept} onValueChange={setFilterTeacherDept}>
                  <SelectTrigger className="w-52 rounded-xl border-gray-300 shadow-sm">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="IELTS Department">IELTS Department</SelectItem>
                    <SelectItem value="TOEIC Department">TOEIC Department</SelectItem>
                    <SelectItem value="Business Department">Business Department</SelectItem>
                    <SelectItem value="Kids Department">Kids Department</SelectItem>
                    <SelectItem value="General Department">General Department</SelectItem>
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

          <Card className="p-6 rounded-xl shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers?.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.fullName}</TableCell>
                    <TableCell className="text-sm">{teacher.position}</TableCell>
                    <TableCell>
                      <Badge className="rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-100">
                        {teacher.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{teacher.email}</TableCell>
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
                          // onClick={() => handleDeleteTeacher(teacher.id)}
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
      )}

      {activeView === 'staff' && (
        <div className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search staff..."
                  value={searchStaff}
                  onChange={(e) => setSearchStaff(e.target.value)}
                  className="pl-10 rounded-xl border-gray-300 shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700 whitespace-nowrap min-w-[70px]">Department:</label>
                <Select value={filterStaffDept} onValueChange={setFilterStaffDept}>
                  <SelectTrigger className="w-52 rounded-xl border-gray-300 shadow-sm">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Training Department">Training Department</SelectItem>
                    <SelectItem value="Consulting Department">Consulting Department</SelectItem>
                    <SelectItem value="Finance Department">Finance Department</SelectItem>
                    <SelectItem value="Marketing Department">Marketing Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={handleAddStaff}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Staff
            </Button>
          </div>

          <Card className="p-6 rounded-xl shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff?.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.fullName}</TableCell>
                    <TableCell className="text-sm">{member.position}</TableCell>
                    <TableCell>
                      <Badge className="rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-100">
                        {member.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{member.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={member.active ? 'default' : 'secondary'}
                        className={`rounded-lg ${member.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : ''
                          }`}
                      >
                        {member.active ? 'Active' : 'On Leave'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          // onClick={() => handleEditStaffMember(member)}
                          className="rounded-xl hover:bg-blue-50 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                        >
                          <Edit className="w-4 h-4 mr-1.5" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          // onClick={() => handleDeleteStaff(member.id)}
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
      )}

      {/* <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        staff={editingStaff}
        onSave={handleSaveStaff}
        type={editType}
      /> */}

      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        type={addType}
      />
    </div>
  );
}
