export interface ClassResponse {
    id: string;
    name: string;
    classCode: string;
    teacherId: string;
    teacherName: string;
    courseId: string;
    courseName: string;
    schedule: string;
    startDate: string;   // ISO date string (YYYY-MM-DD)
    endDate: string;     // ISO date string
    active: boolean;
    numberOfStudents: number;
    totalNumberOfStudents: number;
    createdAt: string;   // ISO timestamp
}


export interface ClassCreateRequest {
    name: string;
    teacherId: string;
    courseId: string;
    schedule: string;
    startDate: string;   // ISO date string (YYYY-MM-DD)
    endDate: string;     // ISO date string
    totalNumberOfStudents: number;
}

export interface ClassPage {
  content: ClassResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}