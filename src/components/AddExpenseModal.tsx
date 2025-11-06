import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, X } from 'lucide-react';

interface Expense {
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

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newExpense: Expense) => void;
}

export function AddExpenseModal({ isOpen, onClose, onAdd }: AddExpenseModalProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    course: '',
    tuitionFee: 0,
    materialFee: 0,
    paid: 0,
    dueDate: '',
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        studentName: '',
        parentName: '',
        course: '',
        tuitionFee: 0,
        materialFee: 0,
        paid: 0,
        dueDate: '',
      });
    }
  }, [isOpen]);

  const calculateTotals = () => {
    const totalAmount = formData.tuitionFee + formData.materialFee;
    const remaining = totalAmount - formData.paid;
    let status: 'paid' | 'partial' | 'unpaid' = 'unpaid';
    
    if (formData.paid >= totalAmount && totalAmount > 0) {
      status = 'paid';
    } else if (formData.paid > 0 && formData.paid < totalAmount) {
      status = 'partial';
    }

    return { totalAmount, remaining, status };
  };

  const handleAdd = () => {
    // Basic validation
    if (!formData.studentName || !formData.parentName || !formData.course || !formData.dueDate) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (formData.tuitionFee <= 0) {
      alert('Học phí phải lớn hơn 0');
      return;
    }

    const { totalAmount, remaining, status } = calculateTotals();

    const newExpense: Expense = {
      ...formData,
      totalAmount,
      remaining,
      status,
    };

    onAdd(newExpense);
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

  const { totalAmount, remaining, status } = calculateTotals();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Thêm chi phí học viên mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">
                Tên học viên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="studentName"
                placeholder="Nhập tên học viên"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentName">
                Tên phụ huynh <span className="text-red-500">*</span>
              </Label>
              <Input
                id="parentName"
                placeholder="Nhập tên phụ huynh"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tuitionFee">
                Học phí (VNĐ) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tuitionFee"
                type="number"
                min="0"
                placeholder="12000000"
                value={formData.tuitionFee || ''}
                onChange={(e) => setFormData({ ...formData, tuitionFee: parseInt(e.target.value) || 0 })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="materialFee">Phí tài liệu (VNĐ)</Label>
              <Input
                id="materialFee"
                type="number"
                min="0"
                placeholder="800000"
                value={formData.materialFee || ''}
                onChange={(e) => setFormData({ ...formData, materialFee: parseInt(e.target.value) || 0 })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paid">Đã thanh toán (VNĐ)</Label>
              <Input
                id="paid"
                type="number"
                min="0"
                placeholder="0"
                value={formData.paid || ''}
                onChange={(e) => setFormData({ ...formData, paid: parseInt(e.target.value) || 0 })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">
                Hạn thanh toán <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
            <h4 className="text-gray-900 mb-3">Tổng kết chi phí</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tổng chi phí:</span>
                <span className="text-gray-900">
                  {totalAmount.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Đã thanh toán:</span>
                <span className="text-green-600">
                  {formData.paid.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-300">
                <span className="text-gray-900">Còn lại:</span>
                <span className={`${remaining > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {remaining.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-900">Trạng thái:</span>
                <span className={`
                  ${status === 'paid' ? 'text-green-600' : ''}
                  ${status === 'partial' ? 'text-yellow-600' : ''}
                  ${status === 'unpaid' ? 'text-red-600' : ''}
                `}>
                  {status === 'paid' ? 'Đã thanh toán' : 
                   status === 'partial' ? 'Thanh toán một phần' : 'Chưa thanh toán'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
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
            Thêm chi phí
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
