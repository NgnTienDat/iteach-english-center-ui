import type { CourseCreateRequest, CoursePage, CourseUpdateRequest } from "../types/course";
import { AUTH_REQUEST } from "../utils/axiosConfig";
import { endpoints } from "../utils/endPoint";


export async function getAllCoursesApi(
  page: number = 0,
  size: number = 10
): Promise<CoursePage> {
  try {
    const res = await AUTH_REQUEST.get(`${endpoints.ALL_COURSES}page`, {
      params: { page, size },
    });

    if (res.status !== 200) {
      throw new Error(res.data?.message || "Fetching courses failed");
    }

    return res.data.result as CoursePage;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "An unexpected error occurred while fetching courses."
    );
  }
}


export async function createCourseApi(payload: CourseCreateRequest): Promise<void> {
  try {
    const res = await AUTH_REQUEST.post(endpoints.CREATE_COURSE, payload);

    if (res.status !== 201 && res.status !== 200) {
      throw new Error(res.data?.message || "Creating course failed");
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "An unexpected error occurred while creating course."
    );
  }
}

export async function updateCourseApi(courseId: string, payload: Partial<CourseUpdateRequest>): Promise<void> {

  try {
    const res = await AUTH_REQUEST.put(endpoints.UPDATE_COURSE(courseId), payload);
    if (res.status !== 200) {
      throw new Error(res.data?.message || "Updating course failed");
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "An unexpected error occurred while updating course."
    );
  }
}

export async function deleteCourseApi(courseId: string): Promise<void> {

  try {
    const res = await AUTH_REQUEST.delete(endpoints.DELETE_COURSE(courseId));
    if (res.status !== 200) {
      throw new Error(res.data?.message || "Deleting course failed");
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "An unexpected error occurred while deleting course."
    );
  }
}
