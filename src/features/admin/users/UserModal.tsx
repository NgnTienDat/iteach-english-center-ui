import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import type { User, UserCreatePayload } from "@/types/user";
import { useUser } from "@/hooks/useUser";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function UserModal({ isOpen, onClose, user }: UserModalProps) {
  const { createUser, isCreating, updateUser, isUpdating } = useUser();

  const [formData, setFormData] = useState<UserCreatePayload>({
    fullName: "",
    email: "",
    role: "student",
    active: true,
  });

  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (user) {
        // Edit mode - populate with existing user data
        setFormData({
          fullName: user.fullName,
          email: user.email,
          role: user.roles[0]?.roleName.toLowerCase() || "student",
          active: user.active,
        });
        setAddress(user.address || "");
        setPassword("");
      } else {
        // Add mode - reset form
        setFormData({
          fullName: "",
          email: "",
          role: "student",
          active: true,
        });
        setAddress("");
        setPassword("");
      }
    }
  }, [isOpen, user]);

  const handleSubmit = () => {
    // Basic validation
    if (!formData.fullName || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    if (!user && !password) {
      alert("Password is required for new accounts");
      return;
    }

    createUser(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleUpdate = () => {
    // Basic validation
    if (!formData.fullName || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    const updatePayload: Partial<UserCreatePayload> = {
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role,
      password: password,
      active: formData.active,
    };

    console.log("Updating user with payload:", updatePayload);
    console.log("User ID:", user!.id);

    updateUser({ userId: user!.id, payload: updatePayload }, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{user ? "Edit Account" : "Add New Account"}</DialogTitle>
          <DialogDescription>
            {user
              ? "Make changes to the account details."
              : "Enter the details for the new account."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter full name"
                className="rounded-xl border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="email@example.com"
                className="rounded-xl border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger className="rounded-xl border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentStatus">Trạng thái *</Label>
              <Select value={formData?.active ? "active" : "inactive"}
                onValueChange={(value) => setFormData({ ...formData, active: value === 'active' })}
              >
                <SelectTrigger className="rounded-xl border-gray-300 hover:shadow-md transition-shadow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang học</SelectItem>
                  <SelectItem value="inactive">Tạm dừng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                <div className="flex flex-col">

                  Password {user ? <span className="text-sm font-light text-gray-400">leave empty if no change</span> :
                    <span className="text-sm font-light text-gray-400"> Will be generated randomly if left blank</span>}
                </div>
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="rounded-xl border-gray-300"
              />
            </div>
          </div>

          {user &&
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full address"
                className="rounded-xl border-gray-300"
              />
            </div>}
        </div>

        <DialogFooter className="flex space-x-3 sm:gap-0 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl"
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={
              user ? handleUpdate : handleSubmit
            }
            className="bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl"
            disabled={isCreating}
          >
            {isCreating ? "Adding..." : user ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}