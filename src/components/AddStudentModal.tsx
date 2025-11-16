import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, X } from 'lucide-react';
import type { StudentCreatePayload } from '../types/user';
import { useStudent } from '../hooks/useStudent';



interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: { id: string; name: string }[];
}

export function AddStudentModal({ isOpen, onClose, courses }: AddStudentModalProps) {
  const { createStudentMutation } = useStudent();
  const [formData, setFormData] = useState<StudentCreatePayload>({
    fullName: '',
    classId: '',
    courseId: '',
    email: '',
    phoneNumber: '',
    status: 'active',
  });


  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: '',
        classId: '',
        courseId: '',
        email: '',
        phoneNumber: '',
        status: 'active',
      });
    }
  }, [isOpen]);

  const handleAdd = () => {
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
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
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      alert('Số điện thoại không hợp lệ (phải có 10 chữ số)');
      return;
    }

    console.log('Submitting student data:', formData);

    createStudentMutation.mutate(formData, {
      onSuccess: () => {
        alert("Tạo sinh viên thành công!");
        onClose();
      },
      onError: (error: any) => {
        alert(error.message || "Có lỗi xảy ra");
      },
    });
  };



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
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
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
                value={formData.courseId}
                onValueChange={(value) => setFormData({ ...formData, courseId: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Chọn khóa học" />
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
              <Label htmlFor="studentClass">
                Lớp học <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.classId}
                // onValueChange={(value) => setFormData({ ...formData, classId: value })}
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

          {/* <div className="space-y-2">
            <Label htmlFor="studentAddress">Địa chỉ</Label>
            <Input
              id="studentAddress"
              placeholder="Nhập địa chỉ"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
            />
          </div> */}

          <div className="grid grid-cols-2 gap-4">
            {/* <div className="space-y-2">
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
            </div> */}

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
                  <SelectItem value="progress">Chờ xếp lớp</SelectItem>
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
