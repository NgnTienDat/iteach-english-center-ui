import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../components/ui/dialog';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { formatDate } from '../../../utils/helper';
import { useStudent } from '../../../hooks/useStudent';
import { Loader2, Mail, Phone, MapPin, Calendar, User, BookOpen, BookCheck, FileText, CheckCircle, Award, ChevronRight } from 'lucide-react';
import type { StudentDetail } from '../../../types/user';
import { useState } from 'react';

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string | null;
}

export function StudentDetailModal({ isOpen, onClose, studentId }: StudentDetailModalProps) {
  const { studentDetailQuery } = useStudent();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Sử dụng studentDetailQuery với studentId
  const studentQuery = studentDetailQuery(studentId || '');

  const student: StudentDetail | undefined = studentQuery.data;

  if (!studentId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết học viên</DialogTitle>
          <DialogDescription>Thông tin đầy đủ và hồ sơ học tập</DialogDescription>
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
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1">
              <TabsTrigger value="info" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Thông tin cá nhân
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Lịch sử học
              </TabsTrigger>
              <TabsTrigger value="accounts" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Tài khoản học tập
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 mt-6">
              {/* Header Card with Student ID and Status */}
              <Card className="p-6 rounded-xl shadow-md bg-gradient-to-br from-blue-50 to-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900 mb-1">{student?.fullName}</h3>
                    <Badge
                      className={`rounded-lg ${
                        student?.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {student?.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <Badge className="bg-[#2563EB] text-white hover:bg-[#2563EB] rounded-lg px-3 py-1">
                    {student?.userCode}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ngày sinh</p>
                      <p className="text-sm text-gray-900">{formatDate(student?.birthday)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ngày đăng ký</p>
                      <p className="text-sm text-gray-900">{formatDate(student?.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Contact Information */}
              <Card className="p-6 rounded-xl shadow-md">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#2563EB]" />
                  Thông tin liên hệ
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-gray-900">{student?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Số điện thoại</p>
                      <p className="text-sm text-gray-900">{student?.phoneNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Địa chỉ</p>
                      <p className="text-sm text-gray-900">{student?.address}</p>
                    </div>
                  </div>
                </div>
              </Card>

             
            </TabsContent>

            <TabsContent value="history" className="space-y-4 mt-6">
              {!selectedCourse ? (
                <Card className="p-6 rounded-xl shadow-md">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#2563EB]" />
                    Lịch sử khóa học
                  </h3>
                  <div className="space-y-3">
                    {student?.studied && student.studied.length > 0 ? (
                      student.studied.map((s, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedCourse(s.courseName)}
                          className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{s.courseName}</p>
                            <p className="text-sm text-gray-600 mt-1">Lớp: {s.className}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`rounded-lg ${
                                s.status === 'In progress'
                                  ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                  : s.status === 'Completed'
                                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {s.status === 'In progress' ? 'Đang học' : s.status === 'Completed' ? 'Hoàn thành' : s.status}
                            </Badge>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">Chưa có lịch sử khóa học</p>
                    )}
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Back button */}
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Quay lại danh sách khóa học
                  </button>

                  {/* Course Info Card */}
                  <Card className="p-4 rounded-xl shadow-md bg-gradient-to-br from-blue-50 to-white">
                    <h3 className="text-lg font-semibold text-gray-900">{selectedCourse}</h3>
                  </Card>

                  {/* Score Overview Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 rounded-xl shadow-md bg-gradient-to-br from-blue-50 to-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Chuyên cần</p>
                          <p className="text-2xl font-semibold text-blue-700">8.5</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 rounded-xl shadow-md bg-gradient-to-br from-green-50 to-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Bài tập trực tuyến</p>
                          <p className="text-2xl font-semibold text-green-700">9.2</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 rounded-xl shadow-md bg-gradient-to-br from-purple-50 to-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Đánh giá sách</p>
                          <p className="text-2xl font-semibold text-purple-700">8.8</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                          <BookCheck className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 rounded-xl shadow-md bg-gradient-to-br from-amber-50 to-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Sách giáo khoa</p>
                          <p className="text-2xl font-semibold text-amber-700">7.5</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-amber-600" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 rounded-xl shadow-md bg-gradient-to-br from-pink-50 to-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Sách bài tập</p>
                          <p className="text-2xl font-semibold text-pink-700">8.0</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-pink-600" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 rounded-xl shadow-md bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Điểm trung bình</p>
                          <p className="text-2xl font-semibold text-yellow-700">8.4</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                          <Award className="w-6 h-6 text-yellow-600" />
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Detailed Score Table */}
                  <Card className="p-6 rounded-xl shadow-md">
                    <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#2563EB]" />
                      Chi tiết điểm số
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#F0F4FF] hover:bg-[#F0F4FF]">
                          <TableHead>Hạng mục</TableHead>
                          <TableHead className="text-center">Điểm</TableHead>
                          <TableHead className="text-center">Đánh giá</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-blue-50">
                          <TableCell className="font-medium">Chuyên cần</TableCell>
                          <TableCell className="text-center">
                            <Badge className="rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-100">
                              8.5
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className="rounded-lg bg-green-100 text-green-700">
                              Xuất sắc
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-green-50">
                          <TableCell className="font-medium">Bài tập trực tuyến</TableCell>
                          <TableCell className="text-center">
                            <Badge className="rounded-lg bg-green-100 text-green-700 hover:bg-green-100">
                              9.2
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className="rounded-lg bg-green-100 text-green-700">
                              Xuất sắc
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-purple-50">
                          <TableCell className="font-medium">Đánh giá sách</TableCell>
                          <TableCell className="text-center">
                            <Badge className="rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-100">
                              8.8
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className="rounded-lg bg-green-100 text-green-700">
                              Xuất sắc
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-amber-50">
                          <TableCell className="font-medium">Sách giáo khoa</TableCell>
                          <TableCell className="text-center">
                            <Badge className="rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-100">
                              7.5
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className="rounded-lg bg-yellow-100 text-yellow-700">
                              Tốt
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-pink-50">
                          <TableCell className="font-medium">Sách bài tập</TableCell>
                          <TableCell className="text-center">
                            <Badge className="rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-100">
                              8.0
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className="rounded-lg bg-green-100 text-green-700">
                              Xuất sắc
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="accounts" className="space-y-4 mt-6">
                            <div className="space-y-4">
                {/* IMPACT Platform */}
                <Card className="p-6 rounded-xl shadow-md bg-gradient-to-br from-blue-50 to-white">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    IMPACT Platform
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Username</p>
                      <p className="text-sm font-medium text-gray-900">{student?.onlineLearningAccounts[0]?.username || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Password</p>
                      <p className="text-sm font-medium text-gray-900">{student?.onlineLearningAccounts[0]?.password || 'Not set'}</p>
                    </div>
                  </div>
                </Card>

                {/* LOOK Platform */}
                <Card className="p-6 rounded-xl shadow-md bg-gradient-to-br from-green-50 to-white">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <BookCheck className="w-4 h-4 text-green-600" />
                    </div>
                    LOOK Platform
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Username</p>
                      <p className="text-sm font-medium text-gray-900">{student?.onlineLearningAccounts[1]?.username || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Password</p>
                      <p className="text-sm font-medium text-gray-900">{student?.onlineLearningAccounts[1]?.password || 'Not set'}</p>
                    </div>
                  </div>
                </Card>

                {/* Live Worksheet Platform */}
                <Card className="p-6 rounded-xl shadow-md bg-gradient-to-br from-amber-50 to-white">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-amber-600" />
                    </div>
                    Live Worksheet Platform
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Username</p>
                      <p className="text-sm font-medium text-gray-900">{student?.onlineLearningAccounts[2]?.username || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Password</p>
                      <p className="text-sm font-medium text-gray-900">{student?.onlineLearningAccounts[2]?.password || 'Not set'}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}