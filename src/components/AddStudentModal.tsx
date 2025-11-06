import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, X } from 'lucide-react';

interface Student {
  name: string;
  class: string;
  course: string;
  email: string;
  phone: string;
  address: string;
  enrollDate: string;
  status: string;
  parentName?: string;
}

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newStudent: Student) => void;
}

export function AddStudentModal({ isOpen, onClose, onAdd }: AddStudentModalProps) {
  const [formData, setFormData] = useState<Student>({
    name: '',
    class: '',
    course: '',
    email: '',
    phone: '',
    address: '',
    enrollDate: new Date().toISOString().split('T')[0],
    status: 'active',
    parentName: '',
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        class: '',
        course: '',
        email: '',
        phone: '',
        address: '',
        enrollDate: new Date().toISOString().split('T')[0],
        status: 'active',
        parentName: '',
      });
    }
  }, [isOpen]);

  const handleAdd = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.course || !formData.class) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Email không hợp lệ');
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      alert('Số điện thoại không hợp lệ (phải có 10 chữ số)');
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

  const classOptions = [
    'IELTS 6.5+ Morning',
    'IELTS 6.5+ Evening',
    'IELTS Advanced',
    'TOEIC 750+ Evening',
    'TOEIC 850+ Morning',
    'Business English Pro',
    'General English Morning',
    'General English Evening',
    'Kids Beginner',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Thêm học viên mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">
                Họ tên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="studentName"
                placeholder="Nhập họ tên học viên"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentEmail">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="studentEmail"
                type="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentPhone">
                Số điện thoại <span className="text-red-500">*</span>
              </Label>
              <Input
                id="studentPhone"
                placeholder="0901234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentParent">Tên phụ huynh</Label>
              <Input
                id="studentParent"
                placeholder="Nhập tên phụ huynh"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentCourse">
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

            <div className="space-y-2">
              <Label htmlFor="studentClass">
                Lớp học <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.class} 
                onValueChange={(value) => setFormData({ ...formData, class: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Chọn lớp học" />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.map((classItem) => (
                    <SelectItem key={classItem} value={classItem}>
                      {classItem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentAddress">Địa chỉ</Label>
            <Input
              id="studentAddress"
              placeholder="Nhập địa chỉ"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentEnrollDate">
                Ngày nhập học <span className="text-red-500">*</span>
              </Label>
              <Input
                id="studentEnrollDate"
                type="date"
                value={formData.enrollDate}
                onChange={(e) => setFormData({ ...formData, enrollDate: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentStatus">
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
                  <SelectItem value="active">Đang học</SelectItem>
                  <SelectItem value="inactive">Tạm nghỉ</SelectItem>
                  <SelectItem value="graduated">Đã tốt nghiệp</SelectItem>
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
            Thêm học viên
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
