import { useState, useEffect } from "react";
import {
  Plus, Edit, Trash2, Search,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from "lucide-react";
import { UserModal } from "./UserModal";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../../../components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { useUser } from "../../../hooks/useUser";
import type { User } from "@/types/user";

export function UserManagement() {
  // 1. State cho Pagination và Filter
  const [currentPage, setCurrentPage] = useState(0); // API thường bắt đầu từ 0
  const [pageSize] = useState(10); // Cố định 10 item/trang
  const [filterRole, setFilterRole] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 2. Gọi Hook useUser với tham số phân trang
  // Lưu ý: api search chưa có trong hook, nên tạm thời search sẽ chỉ filter trên trang hiện tại 
  // hoặc cần update API sau. Ở đây ta truyền role và page vào.
  const {
    usersPage,
    isLoadingPage,
    isErrorPage,
    errorPage,
    deleteUser,
    refetchPage
  } = useUser({
    role: filterRole === "all" ? undefined : filterRole,
    page: currentPage,
    size: pageSize
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // 3. Reset về trang 0 khi đổi Role hoặc Search
  useEffect(() => {
    setCurrentPage(0);
  }, [filterRole, searchQuery]);

  // Lấy dữ liệu từ usersPage
  // Giả định cấu trúc PageResponse: { content: [], totalPages: 0, totalElements: 0, number: 0, ... }
  const users = usersPage?.content || [];
  const totalPages = usersPage?.totalPages || 0;
  const totalElements = usersPage?.totalElements || 0;

  // Xử lý search client-side (vì API chưa hỗ trợ param search)
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleAddUser = () => { setEditingUser(null); setIsModalOpen(true); };
  const handleEditUser = (user: User) => { setEditingUser(user); setIsModalOpen(true); };
  const handleDeleteUser = (id: string) => { if (confirm("Are you sure?")) deleteUser(id); };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "TEACHER": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "STAFF": return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "STUDENT": return "bg-green-100 text-green-700 hover:bg-green-100";
      case "PARENT": return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      case "ADMIN": return "bg-gray-200 text-gray-700 hover:bg-gray-200";
      default: return "";
    }
  };

  // Logic hiển thị nút phân trang (Rút gọn để hiển thị thông minh: 1 2 ... 5 6 7 ... 10)
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5; // Số lượng nút trang tối đa muốn hiển thị

    let startPage = Math.max(0, currentPage - 2);
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    // Nút trang đầu
    if (startPage > 0) {
      buttons.push(
        <Button key="first" variant="outline" className="h-9 w-9" onClick={() => setCurrentPage(0)}>1</Button>
      );
      if (startPage > 1) buttons.push(<span key="dots1" className="flex items-center justify-center h-9 w-9 text-gray-400">...</span>);
    }

    // Các nút ở giữa
    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      buttons.push(
        <Button
          key={i}
          variant={isActive ? "default" : "outline"}
          className={`h-9 w-9 rounded-lg ${isActive
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm border border-blue-600"
            : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </Button>
      );
    }

    // Nút trang cuối
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) buttons.push(<span key="dots2" className="flex items-center justify-center h-9 w-9 text-gray-400">...</span>);
      buttons.push(
        <Button key="last" variant="outline" className="h-9 w-9" onClick={() => setCurrentPage(totalPages - 1)}>{totalPages}</Button>
      );
    }

    return buttons;
  };

  if (isLoadingPage) return <p className="text-gray-600 p-8">Đang tải danh sách...</p>;
  if (isErrorPage) return <p className="text-red-500 p-8">Lỗi: {errorPage?.message} <Button onClick={() => refetchPage()}>Thử lại</Button></p>;

  // Tính toán hiển thị "Showing X to Y of Z"
  const startRecord = currentPage * pageSize + 1;
  const endRecord = Math.min((currentPage + 1) * pageSize, totalElements);

  return (
    <div className="space-y-6 relative pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 text-2xl font-bold">User Account Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage account information for students, teachers, staff and parents
          </p>
        </div>
        <Button onClick={handleAddUser} className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Add New Account
        </Button>
      </div>

      {/* Table Card */}
      <Card className="p-6 rounded-xl shadow-md min-h-[500px] flex flex-col justify-between">
        <div>
          {/* Filter */}
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search users on this page..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-gray-300"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 whitespace-nowrap">Role:</label>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-48 rounded-xl border-gray-300">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                  <SelectItem value="TEACHER">Teacher</SelectItem>
                  <SelectItem value="PARENT">Parent</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F0F4FF] hover:bg-[#F0F4FF] border-b border-gray-200">
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const role = user.roles?.[0]?.roleName || "N/A";
                  return (
                    <TableRow key={user.id} className="hover:bg-[#F8FAFE] transition-colors border-b border-gray-100">
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell className="text-sm text-gray-600">{user.email}</TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">{user.address || 'N/A'}</TableCell>
                      <TableCell>
                        {user.userCode ? (
                          <Badge className="rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-100">{user.userCode}</Badge>
                        ) : (<span className="text-sm text-gray-400">N/A</span>)}
                      </TableCell>
                      <TableCell>
                        <Badge className={`rounded-lg ${getRoleBadgeColor(role)}`}>{role.toLowerCase()}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.active ? "default" : "secondary"} className={`rounded-lg ${user.active ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}`}>
                          {user.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)} className="rounded-lg hover:bg-gray-100">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)} className="rounded-lg hover:bg-red-100 text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="flex items-center gap-2">
        {/* Về trang đầu */}
        <Button
          variant="outline" size="icon"
          className="h-9 w-9 rounded-lg border-gray-300 text-gray-500 disabled:opacity-50"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(0)}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Lùi 1 trang */}
        <Button
          variant="outline" size="icon"
          className="h-9 w-9 rounded-lg border-gray-300 text-gray-500 disabled:opacity-50"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Các nút số trang (Render dynamic) */}
        <div className="flex gap-1">
          {renderPaginationButtons()}
        </div>

        {/* Tiến 1 trang */}
        <Button
          variant="outline" size="icon"
          className="h-9 w-9 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-50"
          disabled={currentPage >= totalPages - 1}
          onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Về trang cuối */}
        <Button
          variant="outline" size="icon"
          className="h-9 w-9 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-50"
          disabled={currentPage >= totalPages - 1}
          onClick={() => setCurrentPage(totalPages - 1)}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={editingUser} />
    </div>
  );
}