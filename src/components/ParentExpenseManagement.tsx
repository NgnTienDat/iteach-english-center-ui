import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Plus, Edit, Trash2, Search, Eye, DollarSign, AlertCircle, Mail } from 'lucide-react';
import { EditExpenseModal } from './EditExpenseModal';
import { AddExpenseModal } from './AddExpenseModal';
import { AddPaymentModal } from './AddPaymentModal';

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

interface PaymentHistory {
  id: string;
  transactionId: string;
  studentName: string;
  parentName: string;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  status: 'completed' | 'pending' | 'failed';
  notes: string;
}

const mockExpenses: StudentExpense[] = [
  {
    id: 'EXP001',
    studentName: 'Nguyen Minh Anh',
    parentName: 'Nguyen Van Nam',
    course: 'IELTS Foundation',
    tuitionFee: 12000000,
    materialFee: 800000,
    totalAmount: 12800000,
    paid: 12800000,
    remaining: 0,
    status: 'paid',
    dueDate: '10/15/2024',
  },
  {
    id: 'EXP002',
    studentName: 'Tran Hoang Long',
    parentName: 'Tran Thi Mai',
    course: 'TOEIC Advanced',
    tuitionFee: 9000000,
    materialFee: 600000,
    totalAmount: 9600000,
    paid: 5000000,
    remaining: 4600000,
    status: 'partial',
    dueDate: '11/20/2024',
  },
  {
    id: 'EXP003',
    studentName: 'Le Thi Thu',
    parentName: 'Le Van Hung',
    course: 'Business English',
    tuitionFee: 15000000,
    materialFee: 1000000,
    totalAmount: 16000000,
    paid: 0,
    remaining: 16000000,
    status: 'unpaid',
    dueDate: '11/01/2024',
  },
  {
    id: 'EXP004',
    studentName: 'Pham Quoc Anh',
    parentName: 'Pham Thi Lan',
    course: 'IELTS Advanced',
    tuitionFee: 14000000,
    materialFee: 900000,
    totalAmount: 14900000,
    paid: 14900000,
    remaining: 0,
    status: 'paid',
    dueDate: '10/10/2024',
  },
  {
    id: 'EXP005',
    studentName: 'Hoang Minh Tuan',
    parentName: 'Hoang Van Duc',
    course: 'General English',
    tuitionFee: 8000000,
    materialFee: 500000,
    totalAmount: 8500000,
    paid: 3000000,
    remaining: 5500000,
    status: 'partial',
    dueDate: '11/25/2024',
  },
];

const mockPayments: PaymentHistory[] = [
  {
    id: 'PAY001',
    transactionId: 'TXN202410150001',
    studentName: 'Nguyen Minh Anh',
    parentName: 'Nguyen Van Nam',
    amount: 12800000,
    paymentMethod: 'Bank Transfer',
    paymentDate: '10/15/2024',
    status: 'completed',
    notes: 'Full payment for IELTS Foundation course',
  },
  {
    id: 'PAY002',
    transactionId: 'TXN202410200002',
    studentName: 'Tran Hoang Long',
    parentName: 'Tran Thi Mai',
    amount: 5000000,
    paymentMethod: 'Cash',
    paymentDate: '10/20/2024',
    status: 'completed',
    notes: 'First installment',
  },
  {
    id: 'PAY003',
    transactionId: 'TXN202410100003',
    studentName: 'Pham Quoc Anh',
    parentName: 'Pham Thi Lan',
    amount: 14900000,
    paymentMethod: 'Credit Card',
    paymentDate: '10/10/2024',
    status: 'completed',
    notes: 'Full payment for IELTS Advanced course',
  },
  {
    id: 'PAY004',
    transactionId: 'TXN202410220004',
    studentName: 'Hoang Minh Tuan',
    parentName: 'Hoang Van Duc',
    amount: 3000000,
    paymentMethod: 'Bank Transfer',
    paymentDate: '10/22/2024',
    status: 'completed',
    notes: 'First installment',
  },
  {
    id: 'PAY005',
    transactionId: 'TXN202410230005',
    studentName: 'Le Thi Thu',
    parentName: 'Le Van Hung',
    amount: 8000000,
    paymentMethod: 'Bank Transfer',
    paymentDate: '10/23/2024',
    status: 'pending',
    notes: 'Awaiting confirmation',
  },
];

export function ParentExpenseManagement() {
  const [activeView, setActiveView] = useState<'expenses' | 'payments'>('expenses');
  const [expenses, setExpenses] = useState<StudentExpense[]>(mockExpenses);
  const [payments, setPayments] = useState<PaymentHistory[]>(mockPayments);
  const [searchExpense, setSearchExpense] = useState('');
  const [searchPayment, setSearchPayment] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');
  const [editingExpense, setEditingExpense] = useState<StudentExpense | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);

  const calculateOverdueDays = (dueDateStr: string): number => {
    const [month, day, year] = dueDateStr.split('/').map(Number);
    const dueDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - dueDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleSendReminder = (expense: StudentExpense) => {
    alert(`Payment reminder email sent to ${expense.parentName} (${expense.studentName})`);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.studentName.toLowerCase().includes(searchExpense.toLowerCase()) ||
      expense.parentName.toLowerCase().includes(searchExpense.toLowerCase()) ||
      expense.course.toLowerCase().includes(searchExpense.toLowerCase());
    const matchesStatus = filterStatus === 'all' || expense.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchPayment.toLowerCase()) ||
      payment.parentName.toLowerCase().includes(searchPayment.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchPayment.toLowerCase());
    const matchesStatus = filterPaymentStatus === 'all' || payment.status === filterPaymentStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEditExpense = (expense: StudentExpense) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleSaveExpense = (updatedExpense: StudentExpense) => {
    setExpenses(expenses.map((e) => (e.id === updatedExpense.id ? updatedExpense : e)));
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleDeletePayment = (id: string) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  const handleAddExpense = (newExpense: Omit<StudentExpense, 'id'>) => {
    const newId = `EXP${String(expenses.length + 1).padStart(3, '0')}`;
    const fullExpense: StudentExpense = {
      ...newExpense,
      id: newId,
    };
    setExpenses([...expenses, fullExpense]);
  };

  const handleAddPayment = (newPayment: Omit<PaymentHistory, 'id' | 'transactionId'>) => {
    const newId = `PAY${String(payments.length + 1).padStart(3, '0')}`;
    const transactionId = `TXN${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(payments.length + 1).padStart(4, '0')}`;
    const fullPayment: PaymentHistory = {
      ...newPayment,
      id: newId,
      transactionId,
    };
    setPayments([...payments, fullPayment]);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Parent Expense Management</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage tuition fees and payments from parents
        </p>
      </div>

      <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-md w-fit">
        <Button
          variant={activeView === 'expenses' ? 'default' : 'ghost'}
          onClick={() => setActiveView('expenses')}
          className={`rounded-l-xl px-6 py-3 transition-all ${
            activeView === 'expenses'
              ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
              : 'hover:bg-gray-100 hover:text-[#2563EB]'
          }`}
        >
          <DollarSign className="w-4 h-4 mr-2" />
          Student Expenses
        </Button>
        <Button
          variant={activeView === 'payments' ? 'default' : 'ghost'}
          onClick={() => setActiveView('payments')}
          className={`rounded-r-xl px-6 py-3 transition-all ${
            activeView === 'payments'
              ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
              : 'hover:bg-gray-100 hover:text-[#2563EB]'
          }`}
        >
          Payment History
        </Button>
      </div>

      {activeView === 'expenses' && (
        <div className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search students, parents..."
                  value={searchExpense}
                  onChange={(e) => setSearchExpense(e.target.value)}
                  className="pl-10 rounded-xl border-gray-300 shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700 whitespace-nowrap min-w-[80px]">Status:</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-52 rounded-xl border-gray-300 shadow-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="partial">Partially Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              onClick={() => setIsAddExpenseModalOpen(true)}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Expense
            </Button>
          </div>

          <Card className="p-6 rounded-xl shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Total Tuition</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.id}</TableCell>
                    <TableCell>{expense.studentName}</TableCell>
                    <TableCell className="text-sm">{expense.parentName}</TableCell>
                    <TableCell className="text-sm">{expense.course}</TableCell>
                    <TableCell>{formatCurrency(expense.totalAmount)}</TableCell>
                    <TableCell className="text-green-600">
                      {formatCurrency(expense.paid)}
                    </TableCell>
                    <TableCell className={expense.remaining > 0 ? 'text-red-600' : 'text-gray-500'}>
                      {formatCurrency(expense.remaining)}
                    </TableCell>
                    <TableCell className="text-sm">{expense.dueDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`rounded-lg ${
                            expense.status === 'paid'
                              ? 'bg-green-100 text-green-700 hover:bg-green-100'
                              : expense.status === 'partial'
                              ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                              : 'bg-red-100 text-red-700 hover:bg-red-100'
                          }`}
                        >
                          {expense.status === 'paid'
                            ? 'Paid'
                            : expense.status === 'partial'
                            ? 'Partially Paid'
                            : 'Unpaid'}
                        </Badge>
                        {expense.status !== 'paid' && calculateOverdueDays(expense.dueDate) > 0 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <AlertCircle className="w-5 h-5 text-[#F97316] cursor-help" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 text-white rounded-xl">
                              <p>Overdue by {calculateOverdueDays(expense.dueDate)} days</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {expense.status !== 'paid' && calculateOverdueDays(expense.dueDate) > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendReminder(expense)}
                            className="rounded-xl hover:bg-orange-50 hover:border-[#F97316] hover:text-[#F97316] border-orange-200 transition-colors shadow-md"
                          >
                            <Mail className="w-4 h-4 mr-1.5" />
                            Send Reminder
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1.5" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditExpense(expense)}
                          className="rounded-xl hover:bg-blue-50 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                        >
                          <Edit className="w-4 h-4 mr-1.5" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="rounded-xl hover:bg-red-50 hover:border-red-500 text-red-600 border-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-1.5" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {activeView === 'payments' && (
        <div className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search transactions, students..."
                  value={searchPayment}
                  onChange={(e) => setSearchPayment(e.target.value)}
                  className="pl-10 rounded-xl border-gray-300 shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700 whitespace-nowrap min-w-[80px]">Status:</label>
                <Select value={filterPaymentStatus} onValueChange={setFilterPaymentStatus}>
                  <SelectTrigger className="w-52 rounded-xl border-gray-300 shadow-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              onClick={() => setIsAddPaymentModalOpen(true)}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </div>

          <Card className="p-6 rounded-xl shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.transactionId}</TableCell>
                    <TableCell>{payment.studentName}</TableCell>
                    <TableCell className="text-sm">{payment.parentName}</TableCell>
                    <TableCell className="text-green-600">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                    <TableCell className="text-sm">{payment.paymentMethod}</TableCell>
                    <TableCell className="text-sm">{payment.paymentDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={`rounded-lg ${
                          payment.status === 'completed'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : payment.status === 'pending'
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                            : 'bg-red-100 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        {payment.status === 'completed'
                          ? 'Completed'
                          : payment.status === 'pending'
                          ? 'Pending'
                          : 'Failed'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm max-w-xs truncate">
                      {payment.notes}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1.5" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePayment(payment.id)}
                          className="rounded-xl hover:bg-red-50 hover:border-red-500 text-red-600 border-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-1.5" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      <EditExpenseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        expense={editingExpense}
        onSave={handleSaveExpense}
      />

      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        onAdd={handleAddExpense}
      />

      <AddPaymentModal
        isOpen={isAddPaymentModalOpen}
        onClose={() => setIsAddPaymentModalOpen(false)}
        onAdd={handleAddPayment}
      />
    </div>
  );
}
