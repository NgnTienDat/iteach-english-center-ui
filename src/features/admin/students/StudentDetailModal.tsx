import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Card } from '../../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { formatDate } from '../../../utils/helper';
import { useStudent } from '../../../hooks/useStudent';
import { Loader2 } from 'lucide-react';
import type { StudentDetail } from '../../../types/user';

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string | null;
}

export function StudentDetailModal({ isOpen, onClose, studentId }: StudentDetailModalProps) {
  const { studentDetailQuery } = useStudent();

  // Sử dụng studentDetailQuery với studentId
  const studentQuery = studentDetailQuery(studentId || '');

  const student: StudentDetail | undefined = studentQuery.data;

  if (!studentId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết học viên</DialogTitle>
        </DialogHeader>

        {studentQuery.isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        ) : studentQuery.isError ? (
          <p className="text-center text-red-500 py-8">
            Có lỗi xảy ra khi tải thông tin học viên.
          </p>
        ) : (
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="history">Lịch sử học</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <Card className="p-6 rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Mã học viên</p>
                    <p className="mt-1">{student?.userCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Họ tên</p>
                    <p className="mt-1">{student?.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="mt-1 text-sm">{student?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                    <p className="mt-1">{student?.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngày đăng ký</p>
                    <p className="mt-1">{formatDate(student?.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Trạng thái</p>
                    <Badge
                      className={`mt-1 rounded-lg ${student?.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {student?.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card className="p-6 rounded-xl">
                <h3 className="mb-4 text-gray-900">Lịch sử khóa học</h3>
                <div className="space-y-3">
                  {student?.studied.map((s, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p>{s.courseName}</p>
                        <p className="text-sm text-gray-600 mt-1">Lớp: {s.className}</p>
                      </div>
                      <Badge
                        className={`rounded-lg ${s.status === 'In progress'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                          }`}
                      >
                        {s.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
