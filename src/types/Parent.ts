export interface Parent {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    relationship: string;
    occupation: string;
    linkedStudents: string[];
    studentNames: string[];
    registrationDate: string;
    status: 'active' | 'inactive';
}
