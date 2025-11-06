import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Plus, Edit, Trash2, Search, Eye, User } from 'lucide-react';
import { StudentDetailModal } from './StudentDetailModal';
import { EditStudentModal } from './EditStudentModal';
import { AddStudentModal } from './AddStudentModal';
import { ParentDetailModal } from './ParentDetailModal';
import type { Parent } from './ParentManagement';

interface Student {
  id: string;
  name: string;
  class: string;
  course: string;
  averageScore: number;
  status: string;
  email: string;
  phone: string;
  address: string;
  enrollDate: string;
  scores: { subject: string; score: number; date: string }[];
  parentId?: string;
  parentName?: string;
}

const mockStudents: Student[] = [
  {
    id: 'ST001',
    name: 'Nguyen Van An',
    class: 'IELTS 6.5+ Morning',
    course: 'IELTS Foundation',
    averageScore: 8.5,
    status: 'active',
    email: 'nguyenvanan@gmail.com',
    phone: '0901234567',
    address: 'District 1, Ho Chi Minh City',
    enrollDate: '01/15/2025',
    parentId: 'P001',
    parentName: 'Nguyen Van Nam',
    scores: [
      { subject: 'Listening', score: 8.0, date: '10/10/2025' },
      { subject: 'Reading', score: 8.5, date: '10/12/2025' },
      { subject: 'Writing', score: 7.5, date: '10/14/2025' },
    ],
  },
  {
    id: 'ST002',
    name: 'Tran Thi Binh',
    class: 'TOEIC 750+ Evening',
    course: 'TOEIC Advanced',
    averageScore: 9.0,
    status: 'active',
    email: 'tranthibinh@gmail.com',
    phone: '0912345678',
    address: 'District 3, Ho Chi Minh City',
    enrollDate: '01/20/2025',
    parentId: 'P002',
    parentName: 'Tran Thi Mai',
    scores: [
      { subject: 'Listening', score: 9.0, date: '10/10/2025' },
      { subject: 'Reading', score: 9.5, date: '10/12/2025' },
      { subject: 'Grammar', score: 8.5, date: '10/14/2025' },
    ],
  },
  {
    id: 'ST003',
    name: 'Le Hoang Minh',
    class: 'Business English Pro',
    course: 'Business English',
    averageScore: 7.8,
    status: 'active',
    email: 'lehoangminh@gmail.com',
    phone: '0923456789',
    address: 'District 7, Ho Chi Minh City',
    enrollDate: '02/05/2025',
    parentId: 'P003',
    parentName: 'Le Van Hung',
    scores: [
      { subject: 'Speaking', score: 8.0, date: '10/10/2025' },
      { subject: 'Writing', score: 7.5, date: '10/12/2025' },
    ],
  },
  {
    id: 'ST004',
    name: 'Pham Thu Ha',
    class: 'IELTS Advanced',
    course: 'IELTS Advanced',
    averageScore: 8.2,
    status: 'inactive',
    email: 'phamthuha@gmail.com',
    phone: '0934567890',
    address: 'District 2, Ho Chi Minh City',
    enrollDate: '02/10/2025',
    parentId: 'P004',
    parentName: 'Pham Thi Lan',
    scores: [
      { subject: 'Listening', score: 8.5, date: '10/10/2025' },
      { subject: 'Reading', score: 8.0, date: '10/12/2025' },
    ],
  },
  {
    id: 'ST005',
    name: 'Dang Quoc Tuan',
    class: 'General English',
    course: 'General English',
    averageScore: 7.5,
    status: 'active',
    email: 'dangquoctuan@gmail.com',
    phone: '0945678901',
    address: 'District 10, Ho Chi Minh City',
    enrollDate: '02/15/2025',
    parentId: 'P005',
    parentName: 'Hoang Van Duc',
    scores: [
      { subject: 'Grammar', score: 7.5, date: '10/10/2025' },
      { subject: 'Vocabulary', score: 7.5, date: '10/12/2025' },
    ],
  },
];

// Mock parent data for the detail modal
const mockParents: { [key: string]: Parent } = {
  P001: {
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
  P002: {
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
  P003: {
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
  P004: {
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
  P005: {
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
};

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterClass, setFilterClass] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse === 'all' || student.course === filterCourse;
    const matchesClass = filterClass === 'all' || student.class === filterClass;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesCourse && matchesClass && matchesStatus;
  });

  const handleViewDetail = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  const handleSaveStudent = (updatedStudent: Student) => {
    setStudents(students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
  };

  const handleAddStudent = (newStudent: Omit<Student, 'id' | 'averageScore' | 'scores'>) => {
    const newId = `ST${String(students.length + 1).padStart(3, '0')}`;
    const fullStudent: Student = {
      ...newStudent,
      id: newId,
      averageScore: 0,
      scores: [],
    };
    setStudents([...students, fullStudent]);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleViewParent = (parentId: string) => {
    const parent = mockParents[parentId];
    if (parent) {
      setSelectedParent(parent);
      setIsParentModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Student Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage student information, learning history and scores
          </p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Student
        </Button>
      </div>

      <Card className="p-6 rounded-xl shadow-md">
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or student ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl border-gray-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 whitespace-nowrap min-w-[70px]">Course:</label>
              <Select value={filterCourse} onValueChange={setFilterCourse}>
                <SelectTrigger className="w-56 rounded-xl border-gray-300 shadow-sm">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="IELTS Foundation">IELTS Foundation</SelectItem>
                  <SelectItem value="IELTS Advanced">IELTS Advanced</SelectItem>
                  <SelectItem value="TOEIC Advanced">TOEIC Advanced</SelectItem>
                  <SelectItem value="Business English">Business English</SelectItem>
                  <SelectItem value="General English">General English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 whitespace-nowrap min-w-[50px]">Class:</label>
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-56 rounded-xl border-gray-300 shadow-sm">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="IELTS 6.5+ Morning">IELTS 6.5+ Morning</SelectItem>
                  <SelectItem value="TOEIC 750+ Evening">TOEIC 750+ Evening</SelectItem>
                  <SelectItem value="Business English Pro">Business English Pro</SelectItem>
                  <SelectItem value="IELTS Advanced">IELTS Advanced</SelectItem>
                  <SelectItem value="General English">General English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 whitespace-nowrap min-w-[75px]">Status:</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-56 rounded-xl border-gray-300 shadow-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Avg Score</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell className="text-sm">{student.class}</TableCell>
                <TableCell className="text-sm">{student.course}</TableCell>
                <TableCell>
                  <Badge className="rounded-lg bg-[#FBBF24] text-gray-900 hover:bg-[#FBBF24]">
                    {student.averageScore}
                  </Badge>
                </TableCell>
                <TableCell>
                  {student.parentId && student.parentName ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewParent(student.parentId!)}
                          className="flex items-center gap-2 hover:bg-blue-50 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4 text-[#2563EB]" />
                          <span className="text-sm">{student.parentName}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-900 text-white rounded-xl">
                        <p>View parent details</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Not assigned</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={student.status === 'active' ? 'default' : 'secondary'}
                    className={`rounded-lg ${
                      student.status === 'active'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : ''
                    }`}
                  >
                    {student.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetail(student)}
                      className="rounded-xl hover:bg-blue-50 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1.5" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditStudent(student)}
                      className="rounded-xl hover:bg-amber-50 hover:border-[#FBBF24] hover:text-amber-700 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-1.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id)}
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

      <StudentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        student={selectedStudent}
      />

      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={editingStudent}
        onSave={handleSaveStudent}
      />

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddStudent}
      />

      <ParentDetailModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        parent={selectedParent}
      />
    </div>
  );
}
