import { clientApi } from "@/shared/lib/http/client-api";
import { CourseField } from "./type";

export async function fetchCourseField(): Promise<CourseField[]> {
  return clientApi.get<CourseField[]>("/api/courses/courses-field");
}
