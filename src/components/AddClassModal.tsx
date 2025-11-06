import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, X } from 'lucide-react';

interface Class {
  name: string;
  course: string;
  students: number;
  startDate: string;
  endDate: string;
  status: string;
  schedule?: string;
  teacher?: string;
  room?: string;
}

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newClass: Class) => void;
}

export function AddClassModal({ isOpen, onClose, onAdd }: AddClassModalProps) {
  const [formData, setFormData] = useState<Class>({
    name: '',
    course: '',
    students: 0,
    startDate: '',
    endDate: '',
    status: 'active',
    schedule: '',
    teacher: '',
    room: '',
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        course: '',
        students: 0,
        startDate: '',
        endDate: '',
        status: 'active',
        schedule: '',
        teacher: '',
        room: '',
      });
    }
  }, [isOpen]);

  const handleAdd = () => {
    // Basic validation
    if (!formData.name || !formData.course || !formData.startDate || !formData.endDate) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Date validation
    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      alert('Ngày kết thúc phải sau ngày bắt đầu');
      return;
    }

    onAdd(formData);
    onClose();
  };

  const courseOptions = [
    'IELTS Foundation',
    'IELTS Advanced',
    'TOEIC Advanced',
    'Business English',
    'General English',
    'Kids English',
  ];

  const teacherOptions = [
    'Ms. Sarah Johnson',
    'Mr. David Lee',
    'Ms. Emma Wilson',
    'Ms. Linda Brown',
    'Mr. John Smith',
  ];

  const scheduleOptions = [
    'Thứ 2, 4, 6 (Sáng 8h-10h)',
    'Thứ 2, 4, 6 (Chiều 14h-16h)',
    'Thứ 2, 4, 6 (Tối 18h-20h)',
    'Thứ 3, 5, 7 (Sáng 8h-10h)',
    'Thứ 3, 5, 7 (Chiều 14h-16h)',
    'Thứ 3, 5, 7 (Tối 18h-20h)',
    'Thứ 7, Chủ nhật (Sáng 8h-12h)',
  ];

  const roomOptions = [
    'Phòng A101',
    'Phòng A102',
    'Phòng A201',
    'Phòng A202',
    'Phòng B101',
    'Phòng B102',
    'Phòng C101',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Thêm lớp học mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="className">
                Tên lớp <span className="text-red-500">*</span>
              </Label>
              <Input
                id="className"
                placeholder="Nhập tên lớp học"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classCourse">
                Khóa học <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.course} 
                onValueChange={(value) => setFormData({ ...formData, course: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Chọn khóa học" />
                </SelectTrigger>
                <SelectContent>
                  {courseOptions.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classTeacher">Giảng viên</Label>
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

            <div className="space-y-2">
              <Label htmlFor="classRoom">Phòng học</Label>
              <Select 
                value={formData.room} 
                onValueChange={(value) => setFormData({ ...formData, room: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Chọn phòng học" />
                </SelectTrigger>
                <SelectContent>
                  {roomOptions.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="classSchedule">Lịch học</Label>
            <Select 
              value={formData.schedule} 
              onValueChange={(value) => setFormData({ ...formData, schedule: value })}
            >
              <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                <SelectValue placeholder="Chọn lịch học" />
              </SelectTrigger>
              <SelectContent>
                {scheduleOptions.map((schedule) => (
                  <SelectItem key={schedule} value={schedule}>
                    {schedule}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classStartDate">
                Ngày bắt đầu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="classStartDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classEndDate">
                Ngày kết thúc <span className="text-red-500">*</span>
              </Label>
              <Input
                id="classEndDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classStudents">Số lượng học viên</Label>
              <Input
                id="classStudents"
                type="number"
                min="0"
                placeholder="0"
                value={formData.students || ''}
                onChange={(e) => setFormData({ ...formData, students: parseInt(e.target.value) || 0 })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classStatus">
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
                  <SelectItem value="upcoming">Sắp khai giảng</SelectItem>
                  <SelectItem value="completed">Đã kết thúc</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            Thêm lớp học
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
