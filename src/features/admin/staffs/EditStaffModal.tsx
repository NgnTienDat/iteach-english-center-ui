import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Save, X } from 'lucide-react';
import type { StaffResponse } from '@/types/user';
import { useTeacher } from '@/hooks/useTeacher';


interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: StaffResponse | null;
}

export function EditStaffModal({ isOpen, onClose, staff }: EditStaffModalProps) {
  const [formData, setFormData] = useState<StaffResponse | null>(null);
  const {updateTeacher, isUpdating} = useTeacher();

  useEffect(() => {
    if (staff) {
      setFormData({ ...staff });
    }
  }, [staff]);

  if (!formData) return null;

  const handleSave = () => {
    updateTeacher({
      userId: formData.id,
      payload: {
        fullName: formData.fullName,
        position: formData.position,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        active: formData.active,
      },
    });

    // console.log("Updated staff data: ", formData);
    // console.log("Staff ID: ", formData.id);
    onClose();
  };

   const positionOptions = [
    'IELTS Teacher',
    'TOEIC Teacher',
    'Business English Teacher',
    'Kids English Teacher',
    'General English Teacher',
    'Senior Teacher',
    'Part-time Teacher',
  ];

return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Edit Teacher Information</DialogTitle>
          <DialogDescription>Update teacher details and contact information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teacherName">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teacherName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacherPosition">
                Position <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.position} 
                onValueChange={(value) => setFormData({ ...formData, position: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Select position" />
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teacherEmail">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teacherEmail"
                type="email"
                placeholder="example@englishcenter.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacherPhone">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teacherPhone"
                placeholder="+1 234-567-8900"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacherStatus">
              Status <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.active ? 'active' : 'inactive'} 
              onValueChange={(value) => setFormData({ ...formData, active: value === 'active' })}
            >
              <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
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
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
  // return (
  //   <Dialog open={isOpen} onOpenChange={onClose}>
  //     <DialogContent className="max-w-lg rounded-xl">
  //       <DialogHeader>
  //         <DialogTitle>
  //           {type === 'teacher' ? 'Chỉnh sửa thông tin giảng viên' : 'Chỉnh sửa thông tin nhân viên'}
  //         </DialogTitle>
  //       </DialogHeader>

  //       <div className="space-y-4 py-4">
  //         <div className="space-y-2">
  //           <Label htmlFor="staffName">Họ tên *</Label>
  //           <Input
  //             id="staffName"
  //             value={formData.fullName}
  //             onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
  //             className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
  //           />
  //         </div>

  //         <div className="space-y-2">
  //           <Label htmlFor="staffPosition">Chức vụ *</Label>
  //           <Input
  //             id="staffPosition"
  //             value={formData.position}
  //             onChange={(e) => setFormData({ ...formData, position: e.target.value })}
  //             className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
  //           />
  //         </div>

  //         <div className="space-y-2">
  //           <Label htmlFor="staffName">Phone *</Label>
  //           <Input
  //             id="staffName"
  //             value={formData.phoneNumber}
  //             onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
  //             className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
  //           />
  //         </div>

  //         <div className="space-y-2">
  //           <Label htmlFor="staffEmail">Email *</Label>
  //           <Input
  //             id="staffEmail"
  //             type="email"
  //             value={formData.email}
  //             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  //             className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
  //           />
  //         </div>

  //         <div className="space-y-2">
  //           <Label htmlFor="studentStatus">Trạng thái *</Label>
  //             <Select value={formData?.active ? "active" : "inactive"}
  //               onValueChange={(value) => setFormData({ ...formData, active: value === 'active' })}>
  //               <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
  //                 <SelectValue />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="active">Đang học</SelectItem>
  //                 <SelectItem value="inactive">Tạm dừng</SelectItem>
  //               </SelectContent>
  //             </Select>
  //         </div>
  //       </div>

  //       <div className="flex justify-end gap-3 pt-4 border-t">
  //         <Button
  //           variant="outline"
  //           onClick={onClose}
  //           className="rounded-xl hover:bg-gray-100 transition-colors"
  //         >
  //           <X className="w-4 h-4 mr-2" />
  //           Hủy
  //         </Button>
  //         <Button
  //           onClick={handleSave}
  //           className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md transition-colors"
  //         >
  //           <Save className="w-4 h-4 mr-2" />
  //           Lưu thay đổi
  //         </Button>
  //       </div>
  //     </DialogContent>
  //   </Dialog>
  // );
}
