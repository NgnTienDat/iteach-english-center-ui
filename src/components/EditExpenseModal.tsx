import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Save, X } from 'lucide-react';

interface StudentExpense {
  id: string;
  studentName: string;
  parentName: string;
  course: string;
  tuitionFee: number;
  materialFee: number;
  totalAmount: number;
  paid: number;
  remaining: number;
  status: 'paid' | 'partial' | 'unpaid';
  dueDate: string;
}

interface EditExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: StudentExpense | null;
  onSave: (updatedExpense: StudentExpense) => void;
}

export function EditExpenseModal({ isOpen, onClose, expense, onSave }: EditExpenseModalProps) {
  const [formData, setFormData] = useState<StudentExpense | null>(null);

  useEffect(() => {
    if (expense) {
      setFormData({ ...expense });
    }
  }, [expense]);

  if (!formData) return null;

  const handleTuitionChange = (value: number) => {
    const newTotal = value + formData.materialFee;
    const newRemaining = newTotal - formData.paid;
    let newStatus: 'paid' | 'partial' | 'unpaid' = 'unpaid';
    
    if (formData.paid >= newTotal) {
      newStatus = 'paid';
    } else if (formData.paid > 0) {
      newStatus = 'partial';
    }

    setFormData({
      ...formData,
      tuitionFee: value,
      totalAmount: newTotal,
      remaining: newRemaining,
      status: newStatus,
    });
  };

  const handleMaterialFeeChange = (value: number) => {
    const newTotal = formData.tuitionFee + value;
    const newRemaining = newTotal - formData.paid;
    let newStatus: 'paid' | 'partial' | 'unpaid' = 'unpaid';
    
    if (formData.paid >= newTotal) {
      newStatus = 'paid';
    } else if (formData.paid > 0) {
      newStatus = 'partial';
    }

    setFormData({
      ...formData,
      materialFee: value,
      totalAmount: newTotal,
      remaining: newRemaining,
      status: newStatus,
    });
  };

  const handlePaidChange = (value: number) => {
    const newRemaining = formData.totalAmount - value;
    let newStatus: 'paid' | 'partial' | 'unpaid' = 'unpaid';
    
    if (value >= formData.totalAmount) {
      newStatus = 'paid';
    } else if (value > 0) {
      newStatus = 'partial';
    }

    setFormData({
      ...formData,
      paid: value,
      remaining: newRemaining,
      status: newStatus,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin chi phí</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expenseId">Mã chi phí</Label>
              <Input
                id="expenseId"
                value={formData.id}
                disabled
                className="rounded-xl border-gray-300 bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentName">Tên học viên *</Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentName">Tên phụ huynh *</Label>
              <Input
                id="parentName"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Khóa học *</Label>
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
              <Label htmlFor="tuitionFee">Học phí (VNĐ) *</Label>
              <Input
                id="tuitionFee"
                type="number"
                value={formData.tuitionFee}
                onChange={(e) => handleTuitionChange(parseInt(e.target.value) || 0)}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
              <p className="text-xs text-gray-500">{formatCurrency(formData.tuitionFee)} đ</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="materialFee">Phí tài liệu (VNĐ) *</Label>
              <Input
                id="materialFee"
                type="number"
                value={formData.materialFee}
                onChange={(e) => handleMaterialFeeChange(parseInt(e.target.value) || 0)}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
              <p className="text-xs text-gray-500">{formatCurrency(formData.materialFee)} đ</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalAmount">Tổng học phí (VNĐ)</Label>
              <Input
                id="totalAmount"
                type="number"
                value={formData.totalAmount}
                disabled
                className="rounded-xl border-gray-300 bg-gray-50"
              />
              <p className="text-xs text-gray-500">{formatCurrency(formData.totalAmount)} đ</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paid">Đã thanh toán (VNĐ) *</Label>
              <Input
                id="paid"
                type="number"
                value={formData.paid}
                onChange={(e) => handlePaidChange(parseInt(e.target.value) || 0)}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
              <p className="text-xs text-green-600">{formatCurrency(formData.paid)} đ</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remaining">Còn lại (VNĐ)</Label>
              <Input
                id="remaining"
                type="number"
                value={formData.remaining}
                disabled
                className="rounded-xl border-gray-300 bg-gray-50"
              />
              <p className={`text-xs ${formData.remaining > 0 ? 'text-red-600' : 'text-gray-500'}`}>
                {formatCurrency(formData.remaining)} đ
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Hạn thanh toán *</Label>
              <Input
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                placeholder="DD/MM/YYYY"
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Input
                id="status"
                value={
                  formData.status === 'paid'
                    ? 'Đã thanh toán'
                    : formData.status === 'partial'
                    ? 'Thanh toán một phần'
                    : 'Chưa thanh toán'
                }
                disabled
                className="rounded-xl border-gray-300 bg-gray-50"
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
