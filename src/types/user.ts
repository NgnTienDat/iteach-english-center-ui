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