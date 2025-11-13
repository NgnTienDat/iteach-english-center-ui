import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileDown } from 'lucide-react';
import { ParentExpenseManagement } from '../../../components/ParentExpenseManagement';

const revenueData = [
  { month: 'Jan', revenue: 450, target: 500 },
  { month: 'Feb', revenue: 520, target: 500 },
  { month: 'Mar', revenue: 480, target: 500 },
  { month: 'Apr', revenue: 610, target: 550 },
  { month: 'May', revenue: 550, target: 550 },
  { month: 'Jun', revenue: 670, target: 600 },
];

const expenseData = [
  { month: 'Jan', salary: 200, rent: 50, utilities: 30, marketing: 40 },
  { month: 'Feb', salary: 200, rent: 50, utilities: 35, marketing: 45 },
  { month: 'Mar', salary: 210, rent: 50, utilities: 32, marketing: 38 },
  { month: 'Apr', salary: 220, rent: 50, utilities: 35, marketing: 50 },
  { month: 'May', salary: 220, rent: 50, utilities: 33, marketing: 42 },
  { month: 'Jun', salary: 230, rent: 50, utilities: 36, marketing: 55 },
];

const revenueRecords = [
  { month: 'June 2025', amount: '$67,000', note: 'Course tuition fees' },
  { month: 'May 2025', amount: '$55,000', note: 'Course tuition fees' },
  { month: 'April 2025', amount: '$61,000', note: 'Course tuition fees' },
  { month: 'March 2025', amount: '$48,000', note: 'Course tuition fees' },
  { month: 'February 2025', amount: '$52,000', note: 'Course tuition fees' },
];

const expenseRecords = [
  { date: '10/20/2025', type: 'Employee Salaries', amount: '$23,000', approver: 'Director' },
  { date: '10/15/2025', type: 'Rent', amount: '$5,000', approver: 'Director' },
  { date: '10/10/2025', type: 'Marketing Expenses', amount: '$5,500', approver: 'Marketing Manager' },
  { date: '10/05/2025', type: 'Utilities', amount: '$3,600', approver: 'Chief Accountant' },
  { date: '10/01/2025', type: 'Office Supplies', amount: '$1,200', approver: 'Chief Accountant' },
];

export function FinanceManagement() {
  const [activeView, setActiveView] = useState<'revenue' | 'expenses' | 'parent-expenses' | 'reports'>('revenue');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Finance & Reports Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Track revenue, expenses and financial reports
          </p>
        </div>
        <Button className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md">
          <FileDown className="w-4 h-4 mr-2" />
          Export PDF Report
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-md w-fit">
        <Button
          variant={activeView === 'revenue' ? 'default' : 'ghost'}
          onClick={() => setActiveView('revenue')}
          className={`rounded-xl px-6 py-3 transition-all ${activeView === 'revenue'
              ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
              : 'hover:bg-gray-100 hover:text-[#2563EB]'
            }`}
        >
          Revenue
        </Button>
        <Button
          variant={activeView === 'expenses' ? 'default' : 'ghost'}
          onClick={() => setActiveView('expenses')}
          className={`rounded-xl px-6 py-3 transition-all ${activeView === 'expenses'
              ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
              : 'hover:bg-gray-100 hover:text-[#2563EB]'
            }`}
        >
          Expenses
        </Button>
        <Button
          variant={activeView === 'parent-expenses' ? 'default' : 'ghost'}
          onClick={() => setActiveView('parent-expenses')}
          className={`rounded-xl px-6 py-3 transition-all ${activeView === 'parent-expenses'
              ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
              : 'hover:bg-gray-100 hover:text-[#2563EB]'
            }`}
        >
          Parent Expenses
        </Button>
        <Button
          variant={activeView === 'reports' ? 'default' : 'ghost'}
          onClick={() => setActiveView('reports')}
          className={`rounded-xl px-6 py-3 transition-all ${activeView === 'reports'
              ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md'
              : 'hover:bg-gray-100 hover:text-[#2563EB]'
            }`}
        >
          Summary Reports
        </Button>
      </div>

      {activeView === 'revenue' && (
        <div className="space-y-6 mt-6">
          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="mb-4 text-gray-900">Monthly Revenue Chart</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                  formatter={(value: number) => `$${value}K`}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#2563EB" radius={[8, 8, 0, 0]} name="Actual Revenue" />
                <Bar dataKey="target" fill="#FBBF24" radius={[8, 8, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="mb-4 text-gray-900">Revenue Details</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.month}</TableCell>
                    <TableCell className="text-green-600">{record.amount}</TableCell>
                    <TableCell className="text-sm text-gray-600">{record.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {activeView === 'expenses' && (
        <div className="space-y-6 mt-6">
          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="mb-4 text-gray-900">Monthly Expense Chart</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                  formatter={(value: number) => `$${value}K`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="salary"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="Salaries"
                />
                <Line
                  type="monotone"
                  dataKey="rent"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  name="Rent"
                />
                <Line
                  type="monotone"
                  dataKey="utilities"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Utilities"
                />
                <Line
                  type="monotone"
                  dataKey="marketing"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="Marketing"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="mb-4 text-gray-900">Expense Details</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Expense Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Approver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-sm">{record.date}</TableCell>
                    <TableCell>{record.type}</TableCell>
                    <TableCell className="text-red-600">{record.amount}</TableCell>
                    <TableCell className="text-sm text-gray-600">{record.approver}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {activeView === 'parent-expenses' && (
        <div className="mt-6">
          <ParentExpenseManagement />
        </div>
      )}

      {activeView === 'reports' && (
        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-xl shadow-md">
              <p className="text-sm text-gray-600 mb-2">Total Revenue (6 months)</p>
              <h3 className="text-green-600">$328,000</h3>
              <p className="text-xs text-gray-500 mt-2">18% increase from previous period</p>
            </Card>

            <Card className="p-6 rounded-xl shadow-md">
              <p className="text-sm text-gray-600 mb-2">Total Expenses (6 months)</p>
              <h3 className="text-red-600">$198,300</h3>
              <p className="text-xs text-gray-500 mt-2">8% increase from previous period</p>
            </Card>

            <Card className="p-6 rounded-xl shadow-md">
              <p className="text-sm text-gray-600 mb-2">Net Profit (6 months)</p>
              <h3 className="text-[#2563EB]">$129,700</h3>
              <p className="text-xs text-gray-500 mt-2">32% increase from previous period</p>
            </Card>
          </div>

          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="mb-4 text-gray-900">Financial Analysis</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p>Profit Margin</p>
                  <p className="text-sm text-gray-600 mt-1">Revenue vs Expenses</p>
                </div>
                <p className="text-green-600">39.5%</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p>Personnel Costs</p>
                  <p className="text-sm text-gray-600 mt-1">% of total expenses</p>
                </div>
                <p className="text-blue-600">67.2%</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                <div>
                  <p>Average Revenue/Month</p>
                  <p className="text-sm text-gray-600 mt-1">Last 6 months</p>
                </div>
                <p className="text-amber-600">$54,700</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p>Average Expenses/Month</p>
                  <p className="text-sm text-gray-600 mt-1">Last 6 months</p>
                </div>
                <p className="text-purple-600">$33,050</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
