import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Plus, X } from 'lucide-react';

interface Course {
  name: string;
  duration: string;
  teacher: string;
  status: string;
  description?: string;
  fee?: string;
  level?: string;
}

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newCourse: Course) => void;
}

export function AddCourseModal({ isOpen, onClose, onAdd }: AddCourseModalProps) {
  const [formData, setFormData] = useState<Course>({
    name: '',
    duration: '',
    teacher: '',
    status: 'active',
    description: '',
    fee: '',
    level: '',
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        duration: '',
        teacher: '',
        status: 'active',
        description: '',
        fee: '',
        level: '',
      });
    }
  }, [isOpen]);

  const handleAdd = () => {
    // Basic validation
    if (!formData.name || !formData.duration || !formData.teacher) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    onAdd(formData);
    onClose();
  };

  const teacherOptions = [
    'Ms. Sarah Johnson',
    'Mr. David Lee',
    'Ms. Emma Wilson',
    'Ms. Linda Brown',
    'Mr. John Smith',
  ];

  const durationOptions = [
    '1 tháng',
    '2 tháng',
    '3 tháng',
    '4 tháng',
    '6 tháng',
    '12 tháng',
  ];

  const levelOptions = [
    'Beginner',
    'Elementary',
    'Intermediate',
    'Upper-Intermediate',
    'Advanced',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Thêm khóa học mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseName">
                Tên khóa học <span className="text-red-500">*</span>
              </Label>
              <Input
                id="courseName"
                placeholder="Nhập tên khóa học"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseLevel">Trình độ</Label>
              <Select 
                value={formData.level} 
                onValueChange={(value) => setFormData({ ...formData, level: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Chọn trình độ" />
                </SelectTrigger>
                <SelectContent>
                  {levelOptions.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseDuration">
                Thời lượng <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.duration} 
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Chọn thời lượng" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseTeacher">
                Giảng viên <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.teacher} 
                onValueChange={(value) => setFormData({ ...formData, teacher: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Chọn giảng viên" />
                </SelectTrigger>
                <SelectContent>
                  {teacherOptions.map((teacher) => (
                    <SelectItem key={teacher} value={teacher}>
                      {teacher}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseFee">Học phí (VNĐ)</Label>
              <Input
                id="courseFee"
                type="number"
                placeholder="12000000"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseStatus">
                Trạng thái <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({ ...formData, status: value })}
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

          <div className="space-y-2">
            <Label htmlFor="courseDescription">Mô tả khóa học</Label>
            <Textarea
              id="courseDescription"
              placeholder="Nhập mô tả chi tiết về khóa học..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow min-h-[100px]"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
            <p className="text-sm text-blue-700">
              <span className="text-red-500">*</span> Các trường bắt buộc phải điền
            </p>
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
            onClick={handleAdd}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm khóa học
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
