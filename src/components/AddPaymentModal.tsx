import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { DollarSign, X } from 'lucide-react';

interface Payment {
  studentName: string;
  parentName: string;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  status: 'completed' | 'pending' | 'failed';
  notes: string;
}

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newPayment: Payment) => void;
}

export function AddPaymentModal({ isOpen, onClose, onAdd }: AddPaymentModalProps) {
  const [formData, setFormData] = useState<Payment>({
    studentName: '',
    parentName: '',
    amount: 0,
    paymentMethod: '',
    paymentDate: new Date().toISOString().split('T')[0],
    status: 'completed',
    notes: '',
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        studentName: '',
        parentName: '',
        amount: 0,
        paymentMethod: '',
        paymentDate: new Date().toISOString().split('T')[0],
        status: 'completed',
        notes: '',
      });
    }
  }, [isOpen]);

  const handleAdd = () => {
    // Basic validation
    if (!formData.studentName || !formData.parentName || !formData.paymentMethod || !formData.paymentDate) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (formData.amount <= 0) {
      alert('Số tiền thanh toán phải lớn hơn 0');
      return;
    }

    onAdd(formData);
    onClose();
  };

  const paymentMethodOptions = [
    'Tiền mặt',
    'Chuyển khoản',
    'Thẻ tín dụng',
    'Thẻ ghi nợ',
    'Ví điện tử - MoMo',
    'Ví điện tử - ZaloPay',
    'Ví điện tử - VNPay',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Ghi nhận thanh toán</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentStudentName">
                Tên học viên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="paymentStudentName"
                placeholder="Nhập tên học viên"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentParentName">
                Tên phụ huynh <span className="text-red-500">*</span>
              </Label>
              <Input
                id="paymentParentName"
                placeholder="Nhập tên phụ huynh"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentAmount">
                Số tiền (VNĐ) <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="paymentAmount"
                  type="number"
                  min="0"
                  placeholder="5000000"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })}
                  className="rounded-xl border-gray-300 hover:shadow-md transition-shadow pl-10"
                />
              </div>
              {formData.amount > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  {formData.amount.toLocaleString('vi-VN')} VNĐ
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">
                Phương thức <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.paymentMethod} 
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue placeholder="Chọn phương thức" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethodOptions.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentDate">
                Ngày thanh toán <span className="text-red-500">*</span>
              </Label>
              <Input
                id="paymentDate"
                type="date"
                value={formData.paymentDate}
                onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentStatus">
                Trạng thái <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({ ...formData, status: value as 'completed' | 'pending' | 'failed' })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                  <SelectItem value="pending">Đang xử lý</SelectItem>
                  <SelectItem value="failed">Thất bại</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentNotes">Ghi chú</Label>
            <Textarea
              id="paymentNotes"
              placeholder="Nhập ghi chú về thanh toán (nếu có)..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="rounded-xl border-gray-300 hover:shadow-md transition-shadow min-h-[100px]"
            />
          </div>

          {/* Payment Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h4 className="text-gray-900">Thông tin thanh toán</h4>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Học viên:</span>
                <span className="text-gray-900">{formData.studentName || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phụ huynh:</span>
                <span className="text-gray-900">{formData.parentName || '-'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-blue-200">
                <span className="text-gray-900">Số tiền thanh toán:</span>
                <span className="text-green-600">
                  {formData.amount > 0 ? formData.amount.toLocaleString('vi-VN') : '0'} VNĐ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phương thức:</span>
                <span className="text-gray-900">{formData.paymentMethod || '-'}</span>
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
            <DollarSign className="w-4 h-4 mr-2" />
            Ghi nhận thanh toán
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
