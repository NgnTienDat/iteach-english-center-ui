import { useParent } from "../../../hooks/useParent";
import { useStudent } from "../../../hooks/useStudent";
import { useParentForm } from "../../../hooks/useParentForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import { Save, X, Plus } from "lucide-react";
import { toast } from "react-toastify";
import type { Parent } from "../../../types/Parent";


interface EditParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  parent: Parent | null;
  isAddMode: boolean;
}

export function EditParentModal({ isOpen, onClose, parent, isAddMode }: EditParentModalProps) {
  const { studentsAvailableQuery } = useStudent();
  const availableStudents = studentsAvailableQuery.data || [];

  const {
    formData,
    setFormData,
    linkedStudentObjects,
    addStudent,
    removeStudent,
    selectedStudent,
    setSelectedStudent,
    resetForm,
  } = useParentForm({ parent });

  const { createParentMutation } = useParent();

  const handleSave = () => {
    createParentMutation.mutate(
      formData,
      {
        onSuccess: () => {
          toast.success(
            isAddMode ? "Created parent successfully!" : "Updated parent successfully!"
          );

          resetForm();
          studentsAvailableQuery.refetch();
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isAddMode ? "Thêm phụ huynh mới" : "Chỉnh sửa thông tin phụ huynh"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Họ và tên *</Label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Nhập họ tên phụ huynh"
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            {/* Relation */}
            <div className="space-y-2">
              <Label>Quan hệ với học viên *</Label>
              <Select
                value={formData.relationName}
                onValueChange={(value) => setFormData({ ...formData, relationName: value })}
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

            {/* Email */}
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>Số điện thoại *</Label>
              <Input
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="0901234567"
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          {/* Linked Students */}
          <div className="space-y-3 pt-4 border-t">
            <Label>Học viên liên kết</Label>

            <div className="flex items-center gap-2">
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger className="flex-1 rounded-xl border-gray-300">
                  <SelectValue placeholder="Chọn học viên để liên kết" />
                </SelectTrigger>
                <SelectContent>
                  {availableStudents
                    .filter((s) => !formData.linkedStudents.includes(s.id))
                    .map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        <div className="flex w-[300px] justify-between">
                          <span>{student.fullName}</span>
                          <span>({student.userCode})</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Button
                onClick={() => {
                  const obj = availableStudents.find((s) => s.id === selectedStudent);
                  addStudent(obj!);
                }}
                disabled={!selectedStudent}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" /> Thêm
              </Button>
            </div>

            {/* Badge List */}
            <div className="flex flex-wrap gap-2 mt-3">
              {linkedStudentObjects.map((student) => (
                <Badge key={student.id} className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-xl px-3 py-2 flex items-center gap-2">
                  {student.fullName} ({student.userCode})
                  <button onClick={() => removeStudent(student.id)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>

            {linkedStudentObjects.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                Chưa có học viên nào được liên kết
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 mr-2" /> Hủy
          </Button>
          <Button onClick={handleSave}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4 mr-2" /> {isAddMode ? "Thêm phụ huynh" : "Lưu thay đổi"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
