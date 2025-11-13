export interface Course {
  id: string;
  courseCode: string;
  name: string;
  description?: string;
  duration?: string;
  level?: string;
  courseLeaderId: string;
  courseLeaderName: string;
  price: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CoursePage {
  content: Course[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface CourseCreateRequest {
  name: string;
  description?: string;
  duration?: string;
  level?: string;
  courseLeaderId: string;
  price: number;
}

export interface CourseUpdateRequest {
  name: string;
  description?: string;
  duration?: string;
  level?: string;
  courseLeaderId: string;
  price?: number;
  active?: boolean;
}



export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}
