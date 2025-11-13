import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { X, Mail, Phone, Briefcase, MapPin, Users, Calendar } from 'lucide-react';
import type { Parent } from '../features/admin/parents/ParentManagement';

interface ParentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  parent: Parent | null;
}

export function ParentDetailModal({ isOpen, onClose, parent }: ParentDetailModalProps) {
  if (!parent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết phụ huynh</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <Card className="p-6 rounded-xl shadow-md bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">{parent.name}</h3>
                <Badge
                  className={`rounded-lg ${parent.status === 'active'
                      ? 'bg-green-100 text-green-700 hover:bg-green-100'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {parent.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                </Badge>
              </div>
              <Badge className="bg-[#2563EB] text-white hover:bg-[#2563EB] rounded-lg px-3 py-1">
                {parent.id}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Quan hệ</p>
                  <p className="text-sm text-gray-900">{parent.relationship}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Nghề nghiệp</p>
                  <p className="text-sm text-gray-900">{parent.occupation}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ngày đăng ký</p>
                  <p className="text-sm text-gray-900">{parent.registrationDate}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="text-gray-900 mb-4">Thông tin liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{parent.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Số điện thoại</p>
                  <p className="text-sm text-gray-900">{parent.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Địa chỉ</p>
                  <p className="text-sm text-gray-900">{parent.address}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Linked Students */}
          <Card className="p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Học viên liên kết</h3>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-lg">
                {parent.linkedStudents.length} học viên
              </Badge>
            </div>

            {parent.linkedStudents.length > 0 ? (
              <div className="space-y-3">
                {parent.studentNames.map((studentName, index) => (
                  <div
                    key={parent.linkedStudents[index]}
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{studentName}</p>
                        <p className="text-xs text-gray-500">
                          Mã học viên: {parent.linkedStudents[index]}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-lg">
                      Đang học
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Chưa có học viên nào được liên kết</p>
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 rounded-xl shadow-md bg-gradient-to-br from-gray-50 to-white">
            <h3 className="text-gray-900 mb-4">Thao tác nhanh</h3>
            <div className="flex gap-3">
              <Button className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md">
                <Mail className="w-4 h-4 mr-2" />
                Gửi email
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl shadow-md text-white">
                <Phone className="w-4 h-4 mr-2" />
                Gọi điện
              </Button>
            </div>
          </Card>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
