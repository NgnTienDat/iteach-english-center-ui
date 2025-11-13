import { Card } from '../../../components/ui/card';
import { Users, BookOpen, DollarSign, UsersRound } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';

const revenueData = [
  { month: 'Jan', revenue: 45000000 },
  { month: 'Feb', revenue: 52000000 },
  { month: 'Mar', revenue: 48000000 },
  { month: 'Apr', revenue: 61000000 },
  { month: 'May', revenue: 55000000 },
  { month: 'Jun', revenue: 67000000 },
];

const enrollmentData = [
  { month: 'Jan', students: 120 },
  { month: 'Feb', students: 145 },
  { month: 'Mar', students: 138 },
  { month: 'Apr', students: 162 },
  { month: 'May', students: 178 },
  { month: 'Jun', students: 195 },
];

const newStudents = [
  { id: 1, name: 'Nguyen Van An', course: 'IELTS Foundation', date: '10/15/2025', status: 'active' },
  { id: 2, name: 'Tran Thi Binh', course: 'TOEIC Advanced', date: '10/14/2025', status: 'active' },
  { id: 3, name: 'Le Hoang Minh', course: 'Business English', date: '10/13/2025', status: 'pending' },
  { id: 4, name: 'Pham Thu Ha', course: 'IELTS Advanced', date: '10/12/2025', status: 'active' },
  { id: 5, name: 'Dang Quoc Tuan', course: 'General English', date: '10/11/2025', status: 'active' },
];

const activeClasses = [
  { id: 1, name: 'IELTS 6.5+ Morning', students: 15, teacher: 'Ms. Sarah Johnson', schedule: 'Mon-Wed-Fri' },
  { id: 2, name: 'TOEIC 750+ Evening', students: 20, teacher: 'Mr. David Lee', schedule: 'Tue-Thu-Sat' },
  { id: 3, name: 'Business English Pro', students: 12, teacher: 'Ms. Emma Wilson', schedule: 'Mon-Fri' },
  { id: 4, name: 'Kids English Beginner', students: 18, teacher: 'Ms. Linda Brown', schedule: 'Wed-Sat' },
];

export function Dashboard() {
  const summaryCards = [
    {
      title: 'Total Students',
      value: '1,245',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Classes',
      value: '48',
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: 'Monthly Revenue',
      value: '$67,000',
      icon: DollarSign,
      color: 'bg-amber-500',
      change: '+22%'
    },
    {
      title: 'Current Staff',
      value: '32',
      icon: UsersRound,
      color: 'bg-purple-500',
      change: '+3%'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">{card.title}</p>
                  <h3 className="text-gray-900 mb-1">{card.value}</h3>
                  <p className="text-xs text-green-600">{card.change} from last month</p>
                </div>
                <div className={`${card.color} p-3 rounded-xl`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-xl shadow-md">
          <h3 className="mb-4 text-gray-900">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                formatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Bar dataKey="revenue" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 rounded-xl shadow-md">
          <h3 className="mb-4 text-gray-900">Student Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                formatter={(value: number) => `${value} students`}
              />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#FBBF24"
                strokeWidth={3}
                dot={{ fill: '#FBBF24', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-xl shadow-md">
          <h3 className="mb-4 text-gray-900">Recent New Students</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell className="text-sm">{student.course}</TableCell>
                  <TableCell className="text-sm">{student.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={student.status === 'active' ? 'default' : 'secondary'}
                      className={`rounded-lg ${student.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}`}
                    >
                      {student.status === 'active' ? 'Active' : 'Pending'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6 rounded-xl shadow-md">
          <h3 className="mb-4 text-gray-900">Active Classes</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Schedule</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell className="text-sm">{cls.teacher}</TableCell>
                  <TableCell className="text-sm">{cls.students}</TableCell>
                  <TableCell className="text-sm">{cls.schedule}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
