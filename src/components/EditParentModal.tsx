import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Save, X, Plus } from 'lucide-react';
import type { Parent } from '../types/Parent';


interface EditParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  parent: Parent | null;
  onSave: (updatedParent: Partial<Parent>) => void;
  isAddMode: boolean;
}

const availableStudents = [
  { id: 'S001', name: 'Nguyễn Minh Anh' },
  { id: 'S002', name: 'Trần Hoàng Long' },
  { id: 'S003', name: 'Lê Thị Thu' },
  { id: 'S004', name: 'Phạm Quốc Anh' },
  { id: 'S005', name: 'Phạm Minh Châu' },
  { id: 'S006', name: 'Hoàng Minh Tuấn' },
  { id: 'S007', name: 'Vũ Thanh Tùng' },
  { id: 'S008', name: 'Đỗ Thị Hà' },
];

export function EditParentModal({ isOpen, onClose, parent, onSave, isAddMode }: EditParentModalProps) {
  const [formData, setFormData] = useState<Partial<Parent>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    relationship: '',
    occupation: '',
    linkedStudents: [],
    studentNames: [],
  });

  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    if (parent) {
      setFormData({
        name: parent.name,
        email: parent.email,
        phone: parent.phone,
        address: parent.address,
        relationship: parent.relationship,
        occupation: parent.occupation,
        linkedStudents: parent.linkedStudents,
        studentNames: parent.studentNames,
      });
    } else if (isAddMode) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        relationship: '',
        occupation: '',
        linkedStudents: [],
        studentNames: [],
      });
    }
  }, [parent, isAddMode]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleAddStudent = () => {
    if (selectedStudent && !formData.linkedStudents?.includes(selectedStudent)) {
      const student = availableStudents.find((s) => s.id === selectedStudent);
      if (student) {
        setFormData({
          ...formData,
          linkedStudents: [...(formData.linkedStudents || []), student.id],
          studentNames: [...(formData.studentNames || []), student.name],
        });
        setSelectedStudent('');
      }
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    const index = formData.linkedStudents?.indexOf(studentId) || -1;
    if (index > -1) {
      const newLinkedStudents = [...(formData.linkedStudents || [])];
      const newStudentNames = [...(formData.studentNames || [])];
      newLinkedStudents.splice(index, 1);
      newStudentNames.splice(index, 1);
      setFormData({
        ...formData,
        linkedStudents: newLinkedStudents,
        studentNames: newStudentNames,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isAddMode ? 'Thêm phụ huynh mới' : 'Chỉnh sửa thông tin phụ huynh'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập họ tên phụ huynh"
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">Quan hệ với học viên *</Label>
              <Select
                value={formData.relationship}
                onValueChange={(value: any) => setFormData({ ...formData, relationship: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Chọn quan hệ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bố">Bố</SelectItem>
                  <SelectItem value="Mẹ">Mẹ</SelectItem>
                  <SelectItem value="Anh">Anh</SelectItem>
                  <SelectItem value="Chị">Chị</SelectItem>
                  <SelectItem value="Ông">Ông</SelectItem>
                  <SelectItem value="Bà">Bà</SelectItem>
                  <SelectItem value="Người giám hộ">Người giám hộ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0901234567"
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Nghề nghiệp</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                placeholder="Nhập nghề nghiệp"
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Nhập địa chỉ"
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow min-h-[80px]"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <Label>Học viên liên kết</Label>
            <div className="flex items-center gap-2">
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger className="flex-1 rounded-xl border-gray-300">
                  <SelectValue placeholder="Chọn học viên để liên kết" />
                </SelectTrigger>
                <SelectContent>
                  {availableStudents
                    .filter((s) => !formData.linkedStudents?.includes(s.id))
                    .map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.id})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleAddStudent}
                disabled={!selectedStudent}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {formData.linkedStudents?.map((studentId, index) => (
                <Badge
                  key={studentId}
                  className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-xl px-3 py-2 flex items-center gap-2"
                >
                  {formData.studentNames?.[index]} ({studentId})
                  <button
                    onClick={() => handleRemoveStudent(studentId)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {formData.linkedStudents?.length === 0 && (
              <p className="text-sm text-gray-500 italic">Chưa có học viên nào được liên kết</p>
            )}
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
            {isAddMode ? 'Thêm phụ huynh' : 'Lưu thay đổi'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
