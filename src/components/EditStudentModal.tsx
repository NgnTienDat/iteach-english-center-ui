import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Save, X } from 'lucide-react';
import { formatDate } from '../utils/helper';

interface Student {
  id: string;
  name: string;
  class: string;
  course: string;
  status: string;
  email: string;
  phone: string;
  enrollDate: string;
}

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

export function EditStudentModal({ isOpen, onClose, student }: EditStudentModalProps) {
  const [formData, setFormData] = useState<Student | null>(null);

  console.log(student)

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    }
  }, [student]);

  if (!formData) return null;

  const handleSave = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin học viên</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Mã học viên</Label>
              <Input
                id="studentId"
                value={student.userCode}
                disabled
                className="rounded-xl border-gray-300 bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentName">Họ tên *</Label>
              <Input
                id="studentName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentEmail">Email *</Label>
              <Input
                id="studentEmail"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentPhone">Số điện thoại *</Label>
              <Input
                id="studentPhone"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentCourse">Khóa học *</Label>
              <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IELTS Foundation">IELTS Foundation</SelectItem>
                  <SelectItem value="IELTS Advanced">IELTS Advanced</SelectItem>
                  <SelectItem value="TOEIC Advanced">TOEIC Advanced</SelectItem>
                  <SelectItem value="Business English">Business English</SelectItem>
                  <SelectItem value="General English">General English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentClass">Lớp *</Label>
              <Select value={formData.class} onValueChange={(value) => setFormData({ ...formData, class: value })}>
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IELTS 6.5+ Morning">IELTS 6.5+ Morning</SelectItem>
                  <SelectItem value="TOEIC 750+ Evening">TOEIC 750+ Evening</SelectItem>
                  <SelectItem value="Business English Pro">Business English Pro</SelectItem>
                  <SelectItem value="IELTS Advanced">IELTS Advanced</SelectItem>
                  <SelectItem value="General English">General English</SelectItem>
                </SelectContent>
              </Select>
            </div>

           

            <div className="space-y-2">
              <Label htmlFor="studentStatus">Trạng thái *</Label>
              <Select  value={formData?.active ? "active" : "inactive"} onValueChange={(value) => setFormData({ ...formData, active: value==='active' })}>
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang học</SelectItem>
                  <SelectItem value="inactive">Tạm dừng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentEnrollDate">Ngày đăng ký</Label>
              <Input
                id="studentEnrollDate"
                value={formatDate(formData.createdAt)}
                readOnly={true}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
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
