import { clientApi } from "@/shared/lib/http/client-api";
import { CourseField } from "./type";

export async function fetchCourseField(): Promise<CourseField[]> {
  return clientApi.get<CourseField[]>("/api/courses/courses-field");
}

export async function updateCourseField(id: string, payload: { fieldName: string }) {
  return clientApi.put(`/api/courses/courses-field/${id}`, JSON.stringify(payload));
}

export async function deleteCourseField(id: string) {
  return clientApi.delete(`/api/courses/courses-field/${id}`);
}

export async function createCourseField(payload: { fieldName: string }) {
  return clientApi.post(`/api/courses/courses-field`, JSON.stringify(payload));
}
