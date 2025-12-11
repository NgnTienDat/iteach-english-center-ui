import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Plus, X } from 'lucide-react';
import type { StudentCreatePayload } from '../../../types/user';
import { useStudent } from '../../../hooks/useStudent';
import { useClass } from '../../../hooks/useClass';
import { toast } from 'react-toastify';
import { Spinner } from '@/components/ui/spinner';
import { useUser } from '@/hooks/useUser';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: { id: string; name: string }[];
}

export function AddStudentModal({ isOpen, onClose, courses }: AddStudentModalProps) {
  const { createStudentMutation, isCreating } = useStudent();
  const { usersUnlinked } = useUser("student");
  const [formData, setFormData] = useState<StudentCreatePayload>({
    userId: '',
    classId: '',
    phoneNumber: '',
    status: 'active',
    address: '',
    birthday: '',
    courseId: '',
    onlineLearningAccounts: [],
  });

  // Separate state for platform accounts
  const [platformAccounts, setPlatformAccounts] = useState({
    impact: { username: '', password: '' },
    look: { username: '', password: '' },
    liveworksheet: { username: '', password: '' },
  });

  const { classByCourseQuery } = useClass({ courseId: formData.courseId });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        userId: '',
        classId: '',
        phoneNumber: '',
        status: 'active',
        address: '',
        birthday: '',
        courseId: '',
        onlineLearningAccounts: [],
      });
      setPlatformAccounts({
        impact: { username: '', password: '' },
        look: { username: '', password: '' },
        liveworksheet: { username: '', password: '' },
      });
    }
  }, [isOpen]);

  const handleAdd = () => {
    if (!formData.userId || !formData.phoneNumber || !formData.courseId || !formData.classId) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      toast.error('Số điện thoại không hợp lệ (phải có 10 chữ số)');
      return;
    }

    // Build online learning accounts array
    const onlineLearningAccounts = [];

    if (platformAccounts.impact.username && platformAccounts.impact.password) {
      onlineLearningAccounts.push({
        platformName: 'IMPACT',
        username: platformAccounts.impact.username,
        password: platformAccounts.impact.password,
      });
    }

    if (platformAccounts.look.username && platformAccounts.look.password) {
      onlineLearningAccounts.push({
        platformName: 'LOOK',
        username: platformAccounts.look.username,
        password: platformAccounts.look.password,
      });
    }

    if (platformAccounts.liveworksheet.username && platformAccounts.liveworksheet.password) {
      onlineLearningAccounts.push({
        platformName: 'Live Worksheet',
        username: platformAccounts.liveworksheet.username,
        password: platformAccounts.liveworksheet.password,
      });
    }

    const payload: StudentCreatePayload = {
      ...formData,
      onlineLearningAccounts,
    };

    console.log('Submitting student data:', payload);

    createStudentMutation(payload, {
      onSuccess: () => {
        toast.success("Thêm học viên mới thành công!");
        onClose();
      },
      onError: (error: any) => {
        toast.error(error.message || "Có lỗi xảy ra");
      },
    });
  };

  const classes = classByCourseQuery.data || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Thêm học viên mới</DialogTitle>
        </DialogHeader>




        <div className="space-y-4 py-4">
          {/* <div className="grid grid-cols gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentCourse">
                Tài khoản <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.userId}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    userId: value,
                  });
                }}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md">
                  <SelectValue placeholder="Chọn tài khoản liên kết" />
                </SelectTrigger>

                <SelectContent>
                  {usersUnlinked?.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      <div className='flex justify-between w-full gap-6'>
                        <span className='truncate'>{u.userCode}</span>
                        <span className='truncate'>{u.email}</span>
                        <span className='truncate'>{u.fullName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div> */}

          <div className="space-y-2 bg-blue-50 p-4 rounded-xl border border-blue-200">
            <Label htmlFor="owner">Select linked student</Label>
            <Select
              value={formData.userId}
              onValueChange={(value) => {
                setFormData({
                  ...formData,
                  userId: value,
                });
              }}
            >
              <SelectTrigger className="rounded-xl border-gray-300 bg-white">
                <SelectValue placeholder={`Select a student`} />
              </SelectTrigger>
              <SelectContent>
                {usersUnlinked?.length === 0 ? (
                  <div className="p-2 text-sm text-gray-500">No unlinked students available</div>
                ) : (
                  usersUnlinked?.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      <div className="flex space-x-5">
                        <span className="font-medium">{u.userCode}</span>
                        <span className="text-md text-gray-600">{u.fullName}</span>
                      </div>
                    </SelectItem>
                  ))
                )}
                
              </SelectContent>
            </Select>
            <p className="text-xs text-blue-700 mt-2">
              This account will be linked to the selected student's profile
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentPhone">
                Số điện thoại <span className="text-red-500">*</span>
              </Label>
              <Input
                id="studentPhone"
                placeholder="0901234567"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentStatus">
                Trạng thái <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="progress">Chờ xếp lớp</SelectItem>
                  <SelectItem value="active">Đang học</SelectItem>
                  <SelectItem value="inactive">Tạm nghỉ</SelectItem>
                  <SelectItem value="graduated">Đã tốt nghiệp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentAddress">Địa chỉ</Label>
              <Input
                id="studentAddress"
                placeholder="123 Đường ABC, Quận 1"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentBirthday">Ngày sinh</Label>
              <Input
                id="studentBirthday"
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                className="rounded-xl border-gray-300 hover:shadow-md transition-shadow"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentCourse">
                Khóa học <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.courseId}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    courseId: value,
                    classId: ""
                  });
                }}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md">
                  <SelectValue placeholder="Chọn khóa học" />
                </SelectTrigger>

                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentClass">
                Lớp học <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.classId}
                onValueChange={(value) => setFormData({ ...formData, classId: value })}
                disabled={!formData.courseId || classByCourseQuery.isLoading}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md">
                  <SelectValue
                    placeholder={
                      !formData.courseId
                        ? "Chọn khóa học trước"
                        : classByCourseQuery.isLoading
                          ? "Đang tải..."
                          : "Chọn lớp học"
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {classByCourseQuery.isLoading ? (
                    <div className="p-2 text-sm">Đang tải lớp...</div>
                  ) : classes.length === 0 ? (
                    <div className="p-2 text-sm">Không có lớp nào</div>
                  ) : (
                    classes.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Tài khoản học trực tuyến (Tùy chọn)</h3>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-medium text-blue-900">IMPACT Platform</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="impactUsername" className="text-xs">Username</Label>
                      <Input
                        id="impactUsername"
                        value={platformAccounts.impact.username}
                        onChange={(e) => setPlatformAccounts({
                          ...platformAccounts,
                          impact: { ...platformAccounts.impact, username: e.target.value }
                        })}
                        placeholder="e.g., minhnguyen123"
                        className="rounded-xl border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="impactPassword" className="text-xs">Password</Label>
                      <Input
                        id="impactPassword"
                        type="password"
                        value={platformAccounts.impact.password}
                        onChange={(e) => setPlatformAccounts({
                          ...platformAccounts,
                          impact: { ...platformAccounts.impact, password: e.target.value }
                        })}
                        placeholder="e.g., pass2024!"
                        className="rounded-xl border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-medium text-green-900">LOOK Platform</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="lookUsername" className="text-xs">Username</Label>
                      <Input
                        id="lookUsername"
                        value={platformAccounts.look.username}
                        onChange={(e) => setPlatformAccounts({
                          ...platformAccounts,
                          look: { ...platformAccounts.look, username: e.target.value }
                        })}
                        placeholder="e.g., studentA01"
                        className="rounded-xl border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lookPassword" className="text-xs">Password</Label>
                      <Input
                        id="lookPassword"
                        type="password"
                        value={platformAccounts.look.password}
                        onChange={(e) => setPlatformAccounts({
                          ...platformAccounts,
                          look: { ...platformAccounts.look, password: e.target.value }
                        })}
                        placeholder="e.g., look@123"
                        className="rounded-xl border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-medium text-amber-900">Live Worksheet Platform</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="liveworksheetUsername" className="text-xs">Username</Label>
                      <Input
                        id="liveworksheetUsername"
                        value={platformAccounts.liveworksheet.username}
                        onChange={(e) => setPlatformAccounts({
                          ...platformAccounts,
                          liveworksheet: { ...platformAccounts.liveworksheet, username: e.target.value }
                        })}
                        placeholder="e.g., hoanganh05"
                        className="rounded-xl border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="liveworksheetPassword" className="text-xs">Password</Label>
                      <Input
                        id="liveworksheetPassword"
                        type="password"
                        value={platformAccounts.liveworksheet.password}
                        onChange={(e) => setPlatformAccounts({
                          ...platformAccounts,
                          liveworksheet: { ...platformAccounts.liveworksheet, password: e.target.value }
                        })}
                        placeholder="e.g., worksheet777"
                        className="rounded-xl border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
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
            disabled={isCreating}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md transition-colors"
          >
            {isCreating ? (
              <div className="flex justify-center items-center space-x-2">
                <Spinner className="size-4" />
                <span>Đang thêm</span>
              </div>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Thêm học viên
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}