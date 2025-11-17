export interface Parent {
  id: string;
  userCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  relationName: string;
  linkedStudents: {
    id: string;
    userCode: string;
    fullName: string;
    active: boolean;
  }[];
  active: boolean;
  createdAt: string;
}


export interface ParentFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  relationName: string;
  linkedStudents: string[]; 
}
