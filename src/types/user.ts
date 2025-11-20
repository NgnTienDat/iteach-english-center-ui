import type { Parent } from "./Parent";

export interface User {
  id: string;
  userCode: string;
  email: string;
  phoneNumber: string | null;
  avatar: string | null;
  fullName: string;
  createdAt: string;
  active: boolean;
  roles: Role[];
}

export interface Role {
  roleName: string;
  description: string;
}

export interface StudentCreatePayload {
  email: string;
  fullName: string;
  phoneNumber: string;
  classId: string;
  courseId: string;
  status: string;
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

export interface StudentDetail {
  id: string;
  userCode: string;
  email: string;
  phoneNumber: string;
  avatar: string | null;
  fullName: string;
  createdAt: string;
  active: boolean;
  studied: ShortClass[];
}


export interface TeacherCreatePayload {
  email: string;
  fullName: string;
  phoneNumber: string;
  status: string;
  department: string;
  position?: string;
  startDate?: string;
  type: string;
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