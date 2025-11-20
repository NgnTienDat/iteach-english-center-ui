import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Plus, X } from 'lucide-react';
import type { TeacherCreatePayload } from '../../../types/user';
import { useTeacher } from '../../../hooks/useTeacher';
import { toast } from 'react-toastify';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

export function AddStaffModal({ isOpen, onClose, type }: AddStaffModalProps) {
  const { createTeacherMutation, createStaffMutation } = useTeacher();
  console.log("type: ", type)

  const [formData, setFormData] = useState<TeacherCreatePayload>({
    email: '',
    fullName: '',
    phoneNumber: '',
    status: 'active',
    department: '',
    position: '',
    startDate: '',
    type: type
  });

  // Reset form when modal closes
  useEffect(() => {
    if (isOpen) {
      // Update type when modal opens
      setFormData(prev => ({
        ...prev,
        type: type
      }));
    } else {
      // Reset form when modal closes
      setFormData({
        email: '',
        fullName: '',
        phoneNumber: '',
        status: 'active',
        department: '',
        position: '',
        startDate: '',
        type: type,
      });
    }
  }, [isOpen, type]); // Add type as dependency

  const handleAdd = () => {
    if (!formData.fullName || !formData.position || !formData.department || !formData.email) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Email không hợp lệ');
      return;
    }


    console.log(formData)

    if (type === 'teacher')
      createTeacherMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Create new teacher successfully!");
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.message || "Something went wrong");
        },
      }
      );
    else createStaffMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Create new staff successfully!");
        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong");
      },
    }
    );

    onClose();
  };

  const departmentOptions = type === 'teacher'
    ? ['IELTS Department', 'TOEIC Department', 'Business Department', 'Kids Department', 'General Department']
    : ['Phòng Đào tạo', 'Phòng Tư vấn', 'Phòng Tài chính', 'Phòng Marketing', 'Phòng Hành chính'];

  const positionOptions = type === 'teacher'
    ? [
      'IELTS Teacher',
      'TOEIC Teacher',
      'Business English Teacher',
      'Kids Teacher',
      'General English Teacher',
      'Teacher',
      'Visiting Teacher',
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
            {/* Full name */}
            <div className="space-y-2">
              <Label>Họ tên *</Label>
              <Input
                placeholder="Nhập họ tên"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                placeholder="example@englishcenter.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Position */}
            <div className="space-y-2">
              <Label>Chức vụ *</Label>
              <Select
                value={formData.position}
                onValueChange={(value) =>
                  setFormData({ ...formData, position: value })
                }
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

            {/* Department */}
            <div className="space-y-2">
              <Label>Bộ phận *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  setFormData({ ...formData, department: value })
                }
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
            {/* Phone */}
            <div className="space-y-2">
              <Label>Số điện thoại</Label>
              <Input
                placeholder="0123456789"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            {/* Start date */}
            <div className="space-y-2">
              <Label>Ngày bắt đầu</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Trạng thái *</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
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
            onClick={handleAdd} disabled={createTeacherMutation.isPending}
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
