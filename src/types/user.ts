import type { Parent } from "./Parent";

export interface User {
  id: string;
  userCode: string;
  email: string;
  phoneNumber: string | null;
  avatar: string | null;
  fullName: string;
  createdAt: string;
  address: string | null;
  active: boolean;
  roles: Role[];
}

export interface UserCreatePayload {
  email: string;
  fullName: string;
  role: string;
  password?: string;
  active?: boolean;
}

export interface Role {
  roleName: string;
  description: string;
}

export interface OnlineLearningCreatePayload {
  platformName: string;
  username: string;
  password: string;
}

export interface StudentCreatePayload {
  userId: string;
  phoneNumber: string;
  courseId: string;
  status: string;
  classId: string;
  address: string;
  birthday: string;
  onlineLearningAccounts: OnlineLearningCreatePayload[];
}

export interface StudentParams {
  classId: string;
  courseId: string;
  isActive: boolean;
}


export interface StudentResponse {
  id: string;
  userCode: string;
  email: string;
  phoneNumber: string;
  avatar: string | null;
  fullName: string;
  createdAt: string;
  active: boolean;
  parent: Parent | null;
}


export interface ShortClass {
  courseName: string;
  className: string;
  status: 'In progress' | 'Completed' | string;
}

export interface OnlineLearningAccountResponse {
  platformName: string;
  username: string;
  password: string;
}



export interface StudentDetail {
  id: string;
  userCode: string;
  email: string;
  phoneNumber: string;
  avatar: string | null;
  fullName: string;
  createdAt: string;
  active: boolean;
  birthday: string;
  address: string;
  studied: ShortClass[];
  onlineLearningAccounts: OnlineLearningAccountResponse[];
}


export interface TeacherCreatePayload {
  email: string;
  fullName: string;
  phoneNumber: string;
  status: string;
  position?: string;
  startDate?: string;
  type: string; /// Để phân biệt teacher và staff (đã xóa create staff nhưng chưa xóa type này, nếu ai đó sửa lại thì xóa cái này đi)
  active?: boolean;
}

export interface Staff {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  status: string;
}

export interface StaffResponse {
  id: string;
  userCode: string;
  email: string;
  phoneNumber: string;
  avatar: string | null;
  fullName: string;
  createdAt: string;
  active: boolean;
  position: string;
  department: string;
}



export interface StudentUpdatePayload {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  active: boolean;
}


