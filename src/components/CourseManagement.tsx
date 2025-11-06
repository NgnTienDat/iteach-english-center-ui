import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { EditCourseModal } from './EditCourseModal';
import { EditClassModal } from './EditClassModal';
import { AddCourseModal } from './AddCourseModal';
import { AddClassModal } from './AddClassModal';

interface Course {
  id: string;
  name: string;
  duration: string;
  teacher: string;
  status: string;
}

interface Class {
  id: string;
  name: string;
  course: string;
  students: number;
  startDate: string;
  endDate: string;
  status: string;
}

const mockCourses: Course[] = [
  {
    id: 'CR001',
    name: 'IELTS Foundation',
    duration: '3 months',
    teacher: 'Ms. Sarah Johnson',
    status: 'active',
  },
  {
    id: 'CR002',
    name: 'IELTS Advanced',
    duration: '4 months',
    teacher: 'Mr. David Lee',
    status: 'active',
  },
  {
    id: 'CR003',
    name: 'TOEIC Advanced',
    duration: '2 months',
    teacher: 'Ms. Emma Wilson',
    status: 'active',
  },
  {
    id: 'CR004',
    name: 'Business English',
    duration: '3 months',
    teacher: 'Ms. Linda Brown',
    status: 'inactive',
  },
  {
    id: 'CR005',
    name: 'General English',
    duration: '6 months',
    teacher: 'Mr. John Smith',
    status: 'active',
  },
];

const mockClasses: Class[] = [
  {
    id: 'CL001',
    name: 'IELTS 6.5+ Morning',
    course: 'IELTS Foundation',
    students: 15,
    startDate: '02/01/2025',
    endDate: '05/01/2025',
    status: 'active',
  },
  {
    id: 'CL002',
    name: 'TOEIC 750+ Evening',
    course: 'TOEIC Advanced',
    students: 20,
    startDate: '01/15/2025',
    endDate: '03/15/2025',
    status: 'active',
  },
  {
    id: 'CL003',
    name: 'Business English Pro',
    course: 'Business English',
    students: 12,
    startDate: '03/01/2025',
    endDate: '06/01/2025',
    status: 'active',
  },
  {
    id: 'CL004',
    name: 'IELTS Advanced',
    course: 'IELTS Advanced',
    students: 18,
    startDate: '02/10/2025',
    endDate: '06/10/2025',
    status: 'active',
  },
  {
    id: 'CL005',
    name: 'General English Morning',
    course: 'General English',
    students: 25,
    startDate: '01/01/2025',
    endDate: '07/01/2025',
    status: 'completed',
  },
];

export function CourseManagement() {
  const [activeView, setActiveView] = useState<'courses' | 'classes'>('courses');
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [searchCourse, setSearchCourse] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchCourse.toLowerCase()) ||
      course.id.toLowerCase().includes(searchCourse.toLowerCase())
  );

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchClass.toLowerCase()) ||
      cls.id.toLowerCase().includes(searchClass.toLowerCase())
  );

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsEditCourseModalOpen(true);
  };

  const handleSaveCourse = (updatedCourse: Course) => {
    setCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleEditClass = (cls: Class) => {
    setEditingClass(cls);
    setIsEditClassModalOpen(true);
  };

  const handleSaveClass = (updatedClass: Class) => {
    setClasses(classes.map((c) => (c.id === updatedClass.id ? updatedClass : c)));
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  const handleAddCourse = (newCourse: Omit<Course, 'id'>) => {
    const newId = `CR${String(courses.length + 1).padStart(3, '0')}`;
    const fullCourse: Course = {
      ...newCourse,
      id: newId,
    };
    setCourses([...courses, fullCourse]);
  };

  const handleAddClass = (newClass: Omit<Class, 'id'>) => {
    const newId = `CL${String(classes.length + 1).padStart(3, '0')}`;
    const fullClass: Class = {
      ...newClass,
      id: newId,
    };
    setClasses([...classes, fullClass]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Course & Class Management</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage course and class information at the center
        </p>
      </div>

      <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-md w-fit">
        <Button
          variant={activeView === 'courses' ? 'default' : 'ghost'}
          onClick={() => setActiveView('courses')}
          className={`rounded-l-xl px-6 py-3 transition-all ${
            activeView === 'courses'
              ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
              : 'hover:bg-gray-100 hover:text-[#2563EB]'
          }`}
        >
          Course List
        </Button>
        <Button
          variant={activeView === 'classes' ? 'default' : 'ghost'}
          onClick={() => setActiveView('classes')}
          className={`rounded-r-xl px-6 py-3 transition-all ${
            activeView === 'classes'
              ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
              : 'hover:bg-gray-100 hover:text-[#2563EB]'
          }`}
        >
          Class List
        </Button>
      </div>

      {activeView === 'courses' && (
        <div className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchCourse}
                onChange={(e) => setSearchCourse(e.target.value)}
                className="pl-10 rounded-xl border-gray-300"
              />
            </div>
            <Button 
              onClick={() => setIsAddCourseModalOpen(true)}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Course
            </Button>
          </div>

          <Card className="p-6 rounded-xl shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course ID</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Teacher in Charge</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.id}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell className="text-sm">{course.duration}</TableCell>
                    <TableCell className="text-sm">{course.teacher}</TableCell>
                    <TableCell>
                      <Badge
                        variant={course.status === 'active' ? 'default' : 'secondary'}
                        className={`rounded-lg ${
                          course.status === 'active'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : ''
                        }`}
                      >
                        {course.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCourse(course)}
                          className="rounded-xl hover:bg-blue-50 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                        >
                          <Edit className="w-4 h-4 mr-1.5" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCourse(course.id)}
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

      {activeView === 'classes' && (
        <div className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search classes..."
                value={searchClass}
                onChange={(e) => setSearchClass(e.target.value)}
                className="pl-10 rounded-xl border-gray-300"
              />
            </div>
            <Button 
              onClick={() => setIsAddClassModalOpen(true)}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Class
            </Button>
          </div>

          <Card className="p-6 rounded-xl shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class ID</TableHead>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell>{cls.id}</TableCell>
                    <TableCell>{cls.name}</TableCell>
                    <TableCell className="text-sm">{cls.course}</TableCell>
                    <TableCell>{cls.students}</TableCell>
                    <TableCell className="text-sm">{cls.startDate}</TableCell>
                    <TableCell className="text-sm">{cls.endDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={`rounded-lg ${
                          cls.status === 'active'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : cls.status === 'completed'
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            : ''
                        }`}
                      >
                        {cls.status === 'active'
                          ? 'In Progress'
                          : cls.status === 'completed'
                          ? 'Completed'
                          : 'Not Started'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClass(cls)}
                          className="rounded-xl hover:bg-blue-50 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                        >
                          <Edit className="w-4 h-4 mr-1.5" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClass(cls.id)}
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

      <EditCourseModal
        isOpen={isEditCourseModalOpen}
        onClose={() => setIsEditCourseModalOpen(false)}
        course={editingCourse}
        onSave={handleSaveCourse}
      />

      <EditClassModal
        isOpen={isEditClassModalOpen}
        onClose={() => setIsEditClassModalOpen(false)}
        classData={editingClass}
        onSave={handleSaveClass}
      />

      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        onAdd={handleAddCourse}
      />

      <AddClassModal
        isOpen={isAddClassModalOpen}
        onClose={() => setIsAddClassModalOpen(false)}
        onAdd={handleAddClass}
      />
    </div>
  );
}
