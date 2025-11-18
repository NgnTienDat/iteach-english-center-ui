import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { EditCourseModal } from './EditCourseModal';
import { EditClassModal } from './EditClassModal';
import { AddCourseModal } from './AddCourseModal';
import { AddClassModal } from './AddClassModal';
import { useCourse } from '../../../hooks/useCourse';
import type { Course } from '../../../types/course';
import { useUser } from '../../../hooks/useUser';
import { useClass } from '../../../hooks/useClass';
import type { ClassResponse } from '../../../types/class';

interface Class {
  id: string;
  name: string;
  course: string;
  students: number;
  startDate: string;
  endDate: string;
  status: string;
}



export function CourseManagement() {
  const [activeView, setActiveView] = useState<'courses' | 'classes'>('courses');
  const [searchCourse, setSearchCourse] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingClass, setEditingClass] = useState<ClassResponse | null>(null);
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);


  const { users } = useUser('teacher');
  const { coursesQuery, deleteCourseMutation } = useCourse();
  const { classesQuery } = useClass();

  const courses = coursesQuery.data?.content || [];
  const classes = classesQuery.data?.content || [];

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

  const handleDeleteCourse = (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      deleteCourseMutation.mutate(id);
    }
  };

  const handleEditClass = (cls: ClassResponse) => {
    setEditingClass(cls);
    setIsEditClassModalOpen(true);
  };

  const handleDeleteClass = (id: string) => {
    console.log('Delete class id', id);
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
          className={`rounded-l-xl px-6 py-3 transition-all ${activeView === 'courses'
            ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
            : 'hover:bg-gray-100 hover:text-[#2563EB]'
            }`}
        >
          Course List
        </Button>
        <Button
          variant={activeView === 'classes' ? 'default' : 'ghost'}
          onClick={() => setActiveView('classes')}
          className={`rounded-r-xl px-6 py-3 transition-all ${activeView === 'classes'
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
                  <TableRow key={course.courseCode}>
                    <TableCell>{course.courseCode}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell className="text-sm">{course.duration}</TableCell>
                    <TableCell className="text-sm">{course.courseLeaderName}</TableCell>
                    <TableCell>
                      <Badge
                        variant={course.active === true ? 'default' : 'secondary'}
                        className={`rounded-lg ${course.active === true
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : ''
                          }`}
                      >
                        {course.active === true ? 'Active' : 'Inactive'}
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
                    <TableCell>{cls.classCode}</TableCell>
                    <TableCell>{cls.name}</TableCell>
                    <TableCell className="text-sm">{cls.courseName}</TableCell>
                    <TableCell className="font-medium">
                      <span
                        className={`px-2 py-1 rounded-lg text-sm font-semibold
                            ${cls.numberOfStudents === cls.totalNumberOfStudents
                            ? "bg-green-100 text-green-700"
                            : cls.numberOfStudents === 0
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                      >
                        {cls.numberOfStudents}
                      </span>

                      <span className="text-gray-500 ml-1">/ {cls.totalNumberOfStudents}</span>
                    </TableCell>

                    <TableCell className="text-sm">{cls.startDate}</TableCell>
                    <TableCell className="text-sm">{cls.endDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={`rounded-lg ${cls.active === true
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : cls.active === false
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            : ''
                          }`}
                      >
                        {cls.active === true
                          ? 'In Progress'
                          : cls.active === false
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
        teachers={users ?? []}
        onSave={(updated) => console.log('Save course', updated)}
      />

      <EditClassModal
        isOpen={isEditClassModalOpen}
        onClose={() => setIsEditClassModalOpen(false)}
        classData={editingClass}
        courses={courses ?? []}
      />

      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        teachers={users ?? []}
        onAdd={(newCourse) => console.log('Add course', newCourse)}
      />

      <AddClassModal
        isOpen={isAddClassModalOpen}
        onClose={() => setIsAddClassModalOpen(false)}
        teachers={users ?? []}
        courses={courses ?? []}
      />
    </div>
  );
}
