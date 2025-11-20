import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, X } from 'lucide-react';

interface Staff {
  name: string;
  position: string;
  department: string;
  email: string;
  status: string;
  phone?: string;
  startDate?: string;
}

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'teacher' | 'staff';
}

export function AddStaffModal({ isOpen, onClose, type }: AddStaffModalProps) {
  const [formData, setFormData] = useState<Staff>({
    name: '',
    position: '',
    department: '',
    email: '',
    status: 'active',
    phone: '',
    startDate: '',
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        position: '',
        department: '',
        email: '',
        status: 'active',
        phone: '',
        startDate: '',
      });
    }
  }, [isOpen]);

  const handleAdd = () => {
    // Basic validation
    if (!formData.name || !formData.position || !formData.department || !formData.email) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Email không hợp lệ');
      return;
    }


    onClose();
  };

  const departmentOptions = type === 'teacher' 
    ? [
        'Khoa IELTS',
        'Khoa TOEIC',
        'Khoa Business',
        'Khoa Kids',
        'Khoa General',
      ]
    : [
        'Phòng Đào tạo',
        'Phòng Tư vấn',
        'Phòng Tài chính',
        'Phòng Marketing',
        'Phòng Hành chính',
      ];

  const positionOptions = type === 'teacher'
    ? [
        'Giảng viên IELTS',
        'Giảng viên TOEIC',
        'Giảng viên Business English',
        'Giảng viên Kids',
        'Giảng viên General English',
        'Giảng viên chính',
        'Giảng viên thỉnh giảng',
      ]
    : [
        'Trưởng phòng Đào tạo',
        'Trưởng phòng Tư vấn',
        'Trưởng phòng Tài chính',
        'Trưởng phòng Marketing',
        'Nhân viên Tư vấn',
        'Nhân viên Marketing',
        'Kế toán',
        'Nhân viên Hành chính',
        'Lễ tân',
      ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900">
            {type === 'teacher' ? 'Thêm giảng viên mới' : 'Thêm nhân viên mới'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="staffName">
                Họ tên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="staffName"
                placeholder="Nhập họ tên"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="staffEmail">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="staffEmail"
                type="email"
                placeholder="example@englishcenter.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="staffPosition">
                Chức vụ <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.position} 
                onValueChange={(value) => setFormData({ ...formData, position: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Chọn chức vụ" />
                </SelectTrigger>
                <SelectContent>
                  {positionOptions.map((pos) => (
                    <SelectItem key={pos} value={pos}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="staffDepartment">
                Bộ phận <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Chọn bộ phận" />
                </SelectTrigger>
                <SelectContent>
                  {departmentOptions.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="staffPhone">Số điện thoại</Label>
              <Input
                id="staffPhone"
                placeholder="0123456789"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="staffStartDate">Ngày bắt đầu</Label>
              <Input
                id="staffStartDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="staffStatus">
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
                <SelectItem value="active">Đang làm việc</SelectItem>
                <SelectItem value="inactive">Tạm nghỉ</SelectItem>
              </SelectContent>
            </Select>
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
            {type === 'teacher' ? 'Thêm giảng viên' : 'Thêm nhân viên'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
