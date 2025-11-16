import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Plus, Edit, Trash2, Search, Eye, Users } from 'lucide-react';
import { EditParentModal } from './EditParentModal';
import { ParentDetailModal } from './ParentDetailModal';
import type { Parent } from '../../../types/Parent';
import { useParent } from '../../../hooks/useParent';


export function ParentManagement() {
  const { parentsQuery } = useParent();
  const parents = parentsQuery.data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [viewingParent, setViewingParent] = useState<Parent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const filteredParents = parents.filter((parent) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      parent.fullName.toLowerCase().includes(search) ||
      parent.email.toLowerCase().includes(search) ||
      parent.phoneNumber.includes(search) ||
      parent.linkedStudents.some((s) => s.fullName.toLowerCase().includes(search));

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" ? parent.active : !parent.active);

    return matchesSearch && matchesStatus;
  });


  const handleAddParent = () => {
    setIsAddMode(true);
    setEditingParent(null);
    setIsEditModalOpen(true);
  };

  const handleEditParent = (parent: Parent) => {
    setIsAddMode(false);
    setEditingParent(parent);
    setIsEditModalOpen(true);
  };

  const handleViewParent = (parent: Parent) => {
    setViewingParent(parent);
    setIsDetailModalOpen(true);
  };



  // const handleDeleteParent = (id: string) => {
  //   if (confirm('Are you sure you want to delete this parent?')) {
  //     setParents(parents.filter((parent) => parent.id !== id));
  //   }
  // };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Parent Management</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage parent information and link with students
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search parents, students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={handleAddParent}
          className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Parent
        </Button>
      </div>

      <Card className="p-6 rounded-xl shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parent ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Relationship</TableHead>

              <TableHead>Linked Students</TableHead>

              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParents.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>{parent.userCode}</TableCell>
                <TableCell>{parent.fullName}</TableCell>
                <TableCell className="text-sm text-gray-600">{parent.email}</TableCell>
                <TableCell className="text-sm">{parent.phoneNumber}</TableCell>
                <TableCell className="text-sm">{parent.relationName}</TableCell>

                {/* Linked Students */}
                <TableCell>
                  <Badge className="bg-blue-100 text-blue-700 rounded-lg">
                    <Users className="w-3 h-3 mr-1" />
                    {parent.linkedStudents.length} student
                    {parent.linkedStudents.length !== 1 ? "s" : ""}
                  </Badge>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    className={`rounded-lg ${parent.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {parent.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewParent(parent)}
                      className="rounded-xl hover:bg-green-50 hover:border-green-500 hover:text-green-700"
                    >
                      <Eye className="w-4 h-4 mr-1.5" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditParent(parent)}
                      className="rounded-xl hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                    >
                      <Edit className="w-4 h-4 mr-1.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      // onClick={() => handleDeleteParent(parent.id)}
                      className="rounded-xl hover:bg-red-50 hover:border-red-500 text-red-600"
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

      <EditParentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        parent={editingParent}
        // onSave={handleSaveParent}
        isAddMode={isAddMode}
      />

      <ParentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        parent={viewingParent}
      />
    </div>
  );
}
