import { useState, useMemo } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Plus, Edit, Trash2, Search, Eye, User } from 'lucide-react';

// Import Components
import { StudentDetailModal } from './StudentDetailModal';
import { EditStudentModal } from './EditStudentModal';
import { AddStudentModal } from './AddStudentModal';

// Import Hooks & Services
import { useCourse } from '../../../hooks/useCourse';
import { useClass } from '../../../hooks/useClass';
import { useStudent } from '../../../hooks/useStudent';
import type { StudentParams } from '../../../types/user';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/ui/tooltip';
import { ParentDetailModal } from '../parents/ParentDetailModal';
import type { Parent } from '../../../types/Parent';



export function StudentManagement() {
  // --- 1. State quản lý Filters ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // --- 2. Hooks Fetching Data ---

  // 2.1. Lấy danh sách Courses (để hiển thị vào Select Box)
  const { coursesQuery } = useCourse({ page: 0, size: 100 }); // Lấy size lớn để hiện hết trong dropdown
  const courses = coursesQuery.data?.content || [];

  // 2.2. Lấy danh sách Classes (Phụ thuộc vào Course đã chọn)
  // Nếu chưa chọn course (all), có thể không fetch hoặc fetch hết (tuỳ logic). 
  // Ở đây ta dùng classByCourseQuery từ hook useClass bạn đã viết
  const { classByCourseQuery } = useClass({
    courseId: filterCourse !== 'all' ? filterCourse : undefined
  });
  const classes = classByCourseQuery.data || [];

  // 2.3. Chuẩn bị Params cho API lấy học sinh
  const studentParams: Partial<StudentParams> = useMemo(() => {
    const params: Partial<StudentParams> = {};

    if (filterClass !== 'all') params.classId = filterClass;
    if (filterCourse !== 'all') params.courseId = filterCourse;

    // Xử lý status: UI đang là string 'active'/'inactive', API cần boolean hoặc string tuỳ backend
    if (filterStatus !== 'all') {
      params.isActive = filterStatus === 'active';
    }

    return params;
  }, [filterClass, filterCourse, filterStatus]);

  // 2.4. Gọi API lấy danh sách học sinh
  const { studentsQuery } = useStudent(studentParams);

  // Dữ liệu học sinh từ API
  const studentList = studentsQuery.data || [];

  // --- 3. Client-side Filter cho Search (Tên/Email) ---
  // API thường hỗ trợ search param, nhưng nếu API chưa có, ta filter tạm ở client
  const filteredStudents = studentList.filter((student: any) => { // Dùng any tạm nếu type User chưa khớp hoàn toàn
    const searchLower = searchQuery.toLowerCase();
    return (
      (student.fullName || student.name || '').toLowerCase().includes(searchLower) ||
      (student.email || '').toLowerCase().includes(searchLower) ||
      (student.id || '').toLowerCase().includes(searchLower)
    );
  });

  // --- State Modal ---
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  // --- Handlers ---
  const handleCourseChange = (value: string) => {
    setFilterCourse(value);
    setFilterClass('all'); // Reset class khi đổi course
  };

  const handleViewDetail = (student: any) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  // Hàm giả lập save (thực tế bạn sẽ dùng mutation trong EditStudentModal)
  const handleSaveStudent = () => {
    // Refetch data
    studentsQuery.refetch();
  };


  const handleViewParent = (student: any) => {
    if (student.parent) {
      setSelectedParent(student.parent); // Lấy parent từ student
      setIsParentModalOpen(true);
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 text-2xl font-bold">Student Management</h2>
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

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, email or student ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl border-gray-300"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-6">

            {/* 1. COURSE SELECT */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 whitespace-nowrap min-w-[60px]">Course:</label>
              <Select value={filterCourse} onValueChange={handleCourseChange}>
                <SelectTrigger className="w-56 rounded-xl border-gray-300 shadow-sm">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 2. CLASS SELECT (Phụ thuộc Course) */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 whitespace-nowrap min-w-[50px]">Class:</label>
              <Select
                value={filterClass}
                onValueChange={setFilterClass}
                disabled={filterCourse === 'all'} // Disable nếu chưa chọn Course (tuỳ logic)
              >
                <SelectTrigger className="w-56 rounded-xl border-gray-300 shadow-sm">
                  <SelectValue placeholder={filterCourse === 'all' ? "Select a course first" : "All Classes"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} ({cls.classCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 3. STATUS SELECT */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 whitespace-nowrap min-w-[60px]">Status:</label>
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

        {/* Table Data */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsQuery.isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">Loading data...</TableCell>
                </TableRow>
              ) : filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">No students found.</TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.userCode}</TableCell>
                    <TableCell>{student.fullName || student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phoneNumber || student.phone || 'N/A'}</TableCell>
                    <TableCell>
                      {student.parent && student.parent.fullName ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewParent(student)}
                              className="flex items-center gap-2 hover:bg-blue-50 rounded-xl transition-colors"
                            >
                              <User className="w-4 h-4 text-[#2563EB]" />
                              <span className="text-sm">{student.parent.fullName}</span>
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
                        // Kiểm tra field isActive (boolean) hoặc status (string) từ API
                        variant={student.active || student.active ? 'default' : 'secondary'}
                        className={`rounded-lg ${student.active || student.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {student.active || student.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    {/* <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleViewDetail(student)}
                          className="h-8 w-8 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditStudent(student)}
                          className="h-8 w-8 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 border-amber-200"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell> */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetail(student.id)}
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
                          // onClick={() => handleDeleteStudent(student.id)}
                          className="rounded-xl hover:bg-red-50 hover:border-red-500 text-red-600 border-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-1.5" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Modals */}
      <StudentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        studentId={selectedStudent}
      />

      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={editingStudent}
      />

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        courses={courses} // Truyền courses thực vào modal add
      />

      <ParentDetailModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        parent={selectedParent}

      />
    </div>
  );
}