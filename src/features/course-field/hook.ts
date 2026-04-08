import { useQuery } from "@tanstack/react-query";
import { fetchCourseField } from "./api";
import { CourseField } from "./type";

export function useCourseField() {
  return useQuery<CourseField[]>({
    queryKey: ["coursesfield"],
    queryFn: fetchCourseField,
  });
}
