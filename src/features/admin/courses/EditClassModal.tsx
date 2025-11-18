import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Save, X } from 'lucide-react';
import type { ClassResponse } from '../../../types/class';
import type { Course } from '../../../types/course';
import { useClass } from '../../../hooks/useClass';


interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassResponse | null;
  courses: Course[] | [];
}

export function EditClassModal({ isOpen, onClose, classData, courses }: EditClassModalProps) {
  const [formData, setFormData] = useState<ClassResponse | null>(null);
  const { updateClassMutation } = useClass();

  useEffect(() => {
    if (classData) {
      setFormData({ ...classData });
    }
  }, [classData]);

  if (!formData) return null;

  const handleSave = () => {
    updateClassMutation.mutate({ classId: formData.id, payload: formData })
    console.log("form data:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin lớp học</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="classId">Mã lớp học</Label>
            <Input
              id="classId"
              value={formData.classCode}
              disabled
              className="rounded-xl border-gray-300 bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="className">Tên lớp học *</Label>
            <Input
              id="className"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="classCourse">Khóa học *</Label>
            <Select
              value={formData.courseId}
              onValueChange={(value) => setFormData({ ...formData, courseId: value })}
            >
              <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                <SelectValue placeholder="Chọn khóa học"/>
              </SelectTrigger>
              <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="classStudents">Số học viên</Label>
            <Input
              id="classStudents"
              type="number"
              value={formData.numberOfStudents}
              onChange={(e) => setFormData({ ...formData, numberOfStudents: parseInt(e.target.value) || 0 })}
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classStartDate">Ngày bắt đầu *</Label>
              <Input
                id="classStartDate"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classEndDate">Ngày kết thúc *</Label>
              <Input
                id="classEndDate"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="classStatus">Trạng thái *</Label>
            <Select value={formData.active} onValueChange={(value) => setFormData({ ...formData, active: value })}>
              <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Đang học</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="upcoming">Chưa bắt đầu</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
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
