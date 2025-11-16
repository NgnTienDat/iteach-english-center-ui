import { useState, useEffect } from "react";
import type { Parent, ParentFormData } from "../types/Parent";

interface UseParentFormProps {
    parent: Parent | null;
}

export function useParentForm({ parent }: UseParentFormProps) {
    const [formData, setFormData] = useState<ParentFormData>({
        fullName: "",
        email: "",
        phoneNumber: "",
        relationName: "",
        linkedStudents: [],
    });

    const [linkedStudentObjects, setLinkedStudentObjects] = useState<
        { id: string; fullName: string; userCode: string }[]
    >([]);

    const [selectedStudent, setSelectedStudent] = useState("");

    // Load data when editing
    useEffect(() => {
        if (parent) {
            setFormData({
                fullName: parent.fullName,
                email: parent.email,
                phoneNumber: parent.phoneNumber,
                relationName: parent.relationName,
                linkedStudents: parent.linkedStudents.map((s) => s.id),
            });

            setLinkedStudentObjects(
                parent.linkedStudents.map((s) => ({
                    id: s.id,
                    fullName: s.fullName,
                    userCode: s.userCode,
                }))
            );
        } else {
            resetForm();
        }
    }, [parent]);

    const resetForm = () => {
        setFormData({
            fullName: "",
            email: "",
            phoneNumber: "",
            relationName: "",
            linkedStudents: [],
        });
        setLinkedStudentObjects([]);
        setSelectedStudent("");
    };

    // Add student
    const addStudent = (studentObj: any) => {
        if (!studentObj) return;

        if (!formData.linkedStudents.includes(studentObj.id)) {
            setFormData((prev) => ({
                ...prev,
                linkedStudents: [...prev.linkedStudents, studentObj.id],
            }));
            setLinkedStudentObjects((prev) => [...prev, studentObj]);
        }

        setSelectedStudent("");
    };

    // Remove student
    const removeStudent = (studentId: string) => {
        setFormData((prev) => ({
            ...prev,
            linkedStudents: prev.linkedStudents.filter((id) => id !== studentId),
        }));

        setLinkedStudentObjects((prev) =>
            prev.filter((s) => s.id !== studentId)
        );
    };

    return {
        formData,
        setFormData,
        linkedStudentObjects,
        addStudent,
        removeStudent,
        selectedStudent,
        setSelectedStudent,
        resetForm,
    };
}
