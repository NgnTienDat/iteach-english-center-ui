import type { ClassCreateRequest, ClassPage, ClassResponse } from "../types/class";
import { AUTH_REQUEST } from "../utils/axiosConfig";
import { endpoints } from "../utils/endPoint";


export async function getAllClassesApi(
  page: number = 0,
  size: number = 10
): Promise<ClassPage> {
  try {
    const res = await AUTH_REQUEST.get(`${endpoints.ALL_CLASSES}`, {
      params: { page, size },
    });

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Fetching courses failed");
    }

    return res.data.result as ClassPage;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "An unexpected error occurred while fetching classes."
    );
  }
}

export async function createClassApi(payload: ClassCreateRequest): Promise<void> {
  try {
    const res = await AUTH_REQUEST.post(endpoints.CREATE_CLASS, payload);
    if (res.status !== 201 && res.status !== 200) {
      throw new Error(res.data?.message || "Creating class failed");
    }
    } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "An unexpected error occurred while creating class."
    );
  }
}

export async function updateClassApi(classId: string, payload: Partial<ClassCreateRequest>): Promise<void> {

  try {
    const res = await AUTH_REQUEST.put(endpoints.UPDATE_CLASS(classId), payload);
    if (res.status !== 200) {
      throw new Error(res.data?.message || "Updating class failed");
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "An unexpected error occurred while updating class."
    );
  }
}

export async function getClassByCourseApi(courseId: string): Promise<ClassResponse[]> {

  try {
    const res = await AUTH_REQUEST.get(endpoints.CLASS_BY_COURSE(courseId));
    if (res.status !== 200) {
      throw new Error(res.data?.message || "Fetching class by course failed");
    }
    return res.data.result;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "An unexpected error occurred while fetching class."
    );
  }
}