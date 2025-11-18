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
  parent: Parent | null; // Trong trường hợp học sinh chưa có phụ huynh
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
