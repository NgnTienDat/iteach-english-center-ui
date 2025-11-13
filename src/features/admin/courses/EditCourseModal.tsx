import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Save, X } from 'lucide-react';
import type { Course, CourseUpdateRequest } from '../../../types/course';
import type { User } from '../../../types/user';
import { useCourse } from '../../../hooks/useCourse';



interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  teachers: User[] | [];
  onSave: (updatedCourse: CourseUpdateRequest) => void;
}

export function EditCourseModal({ isOpen, onClose, course, teachers, onSave }: EditCourseModalProps) {
  const [formData, setFormData] = useState<CourseUpdateRequest | null>(null);
  const { updateCourseMutation } = useCourse();
  const courseId = course?.id || '';


  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        duration: course.duration || '',
        courseLeaderId: course.courseLeaderId,
        description: course.description || '',
        price: course.price,
        level: course.level || '',
        active: course.active,
      });
    }
  }, [course]);

  if (!formData) return null;

  const handleSave = () => {
    onSave(formData);
    updateCourseMutation.mutate({ courseId: courseId, payload: formData });
    console.log('Saved course data:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin khóa học</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">

          <div className="space-y-2">
            <Label htmlFor="courseId">Mã khóa học</Label>
            <Input
              id="courseId"
              value={course?.courseCode}
              disabled
              className="rounded-xl border-gray-300 bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseName">Tên khóa học *</Label>
            <Input
              id="courseName"
              value={course?.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseDuration">Thời lượng *</Label>
            <Input
              id="courseDuration"
              value={course?.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="VD: 3 tháng"
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseTeacher">Giảng viên phụ trách *</Label>
            <Select
              value={formData.courseLeaderId || ''}
              onValueChange={(value) => setFormData({ ...formData, courseLeaderId: value })}
            >
              <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                <SelectValue
                  placeholder="Chọn giảng viên"
                >
                  {teachers.find(t => t.id === formData.courseLeaderId)?.fullName}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


          <div className="space-y-2">
            <Label htmlFor="courseStatus">Trạng thái *</Label>
            <Select
              value={course?.active ? "active" : "inactive"}
              onValueChange={(value) => setFormData({ ...formData, active: value === "active" })}
            >
              <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Tạm dừng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Lưu thay đổi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
