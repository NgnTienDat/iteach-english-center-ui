import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Save, X } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  duration: string;
  teacher: string;
  status: string;
}

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onSave: (updatedCourse: Course) => void;
}

export function EditCourseModal({ isOpen, onClose, course, onSave }: EditCourseModalProps) {
  const [formData, setFormData] = useState<Course | null>(null);

  useEffect(() => {
    if (course) {
      setFormData({ ...course });
    }
  }, [course]);

  if (!formData) return null;

  const handleSave = () => {
    onSave(formData);
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
              value={formData.id}
              disabled
              className="rounded-xl border-gray-300 bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseName">Tên khóa học *</Label>
            <Input
              id="courseName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseDuration">Thời lượng *</Label>
            <Input
              id="courseDuration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="VD: 3 tháng"
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseTeacher">Giảng viên phụ trách *</Label>
            <Select value={formData.teacher} onValueChange={(value) => setFormData({ ...formData, teacher: value })}>
              <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ms. Sarah Johnson">Ms. Sarah Johnson</SelectItem>
                <SelectItem value="Mr. David Lee">Mr. David Lee</SelectItem>
                <SelectItem value="Ms. Emma Wilson">Ms. Emma Wilson</SelectItem>
                <SelectItem value="Ms. Linda Brown">Ms. Linda Brown</SelectItem>
                <SelectItem value="Mr. John Smith">Mr. John Smith</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseStatus">Trạng thái *</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
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
