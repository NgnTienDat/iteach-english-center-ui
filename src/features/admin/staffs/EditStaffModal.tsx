import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Save, X } from 'lucide-react';

interface Staff {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  status: string;
}

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
  onSave: (updatedStaff: Staff) => void;
  type: 'teacher' | 'staff';
}

export function EditStaffModal({ isOpen, onClose, staff, onSave, type }: EditStaffModalProps) {
  const [formData, setFormData] = useState<Staff | null>(null);

  useEffect(() => {
    if (staff) {
      setFormData({ ...staff });
    }
  }, [staff]);

  if (!formData) return null;

  const handleSave = () => {
    onSave(formData);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {type === 'teacher' ? 'Chỉnh sửa thông tin giảng viên' : 'Chỉnh sửa thông tin nhân viên'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="staffName">Họ tên *</Label>
            <Input
              id="staffName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="staffPosition">Chức vụ *</Label>
            <Input
              id="staffPosition"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="staffDepartment">Bộ phận *</Label>
            <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
              <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                <SelectValue />
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

          <div className="space-y-2">
            <Label htmlFor="staffEmail">Email *</Label>
            <Input
              id="staffEmail"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="staffStatus">Trạng thái *</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
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
