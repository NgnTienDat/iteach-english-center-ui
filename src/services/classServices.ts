import type { ClassCreateRequest, ClassPage } from "../types/class";
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
      error.response?.data?.message || error.message || "An unexpected error occurred while fetching courses."
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
