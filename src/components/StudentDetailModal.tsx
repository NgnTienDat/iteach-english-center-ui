import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Student {
  id: string;
  name: string;
  class: string;
  course: string;
  averageScore: number;
  status: string;
  email: string;
  phone: string;
  address: string;
  enrollDate: string;
  scores: { subject: string; score: number; date: string }[];
}

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

export function StudentDetailModal({ isOpen, onClose, student }: StudentDetailModalProps) {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết học viên</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="history">Lịch sử học</TabsTrigger>
            <TabsTrigger value="scores">Điểm số</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card className="p-6 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Mã học viên</p>
                  <p className="mt-1">{student.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Họ tên</p>
                  <p className="mt-1">{student.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="mt-1 text-sm">{student.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số điện thoại</p>
                  <p className="mt-1">{student.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Địa chỉ</p>
                  <p className="mt-1">{student.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày đăng ký</p>
                  <p className="mt-1">{student.enrollDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trạng thái</p>
                  <Badge
                    className={`mt-1 rounded-lg ${
                      student.status === 'active'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {student.status === 'active' ? 'Đang học' : 'Tạm dừng'}
                  </Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="p-6 rounded-xl">
              <h3 className="mb-4 text-gray-900">Lịch sử khóa học</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p>{student.course}</p>
                    <p className="text-sm text-gray-600 mt-1">Lớp: {student.class}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-lg">
                    Đang học
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p>General English Beginner</p>
                    <p className="text-sm text-gray-600 mt-1">Lớp: Morning Class A1</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-lg">
                    Hoàn thành
                  </Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="scores" className="space-y-4">
            <Card className="p-6 rounded-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-gray-900">Bảng điểm</h3>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Điểm trung bình</p>
                  <p className="text-[#2563EB]">{student.averageScore}</p>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Môn học</TableHead>
                    <TableHead>Điểm</TableHead>
                    <TableHead>Ngày thi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.scores.map((score, index) => (
                    <TableRow key={index}>
                      <TableCell>{score.subject}</TableCell>
                      <TableCell>
                        <Badge className="rounded-lg bg-[#FBBF24] text-gray-900 hover:bg-[#FBBF24]">
                          {score.score}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{score.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
