import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Course, CourseBenefit, CourseCategory, CourseDetail, CourseField } from "./type";
import { createCourse, deleteCourse, fetchCourseBenefit, fetchCourseById, fetchCourseCategory, fetchCourseField, fetchCourses } from "./api";

export function useCourses() {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
}

export function useCourseDetail(courseId: string) {
  return useQuery<CourseDetail>({
    queryKey: ["coursesdetail", courseId],
    queryFn: () => fetchCourseById(courseId),
    enabled: !!courseId,
  });
}

export function useCourseCategory() {
  return useQuery<CourseCategory[]>({
    queryKey: ["coursescategory"],
    queryFn: fetchCourseCategory,
  });
}

export function useCourseField() {
  return useQuery<CourseField[]>({
    queryKey: ["coursesfield"],
    queryFn: fetchCourseField,
  });
}
export function useCourseBenefit() {
  return useQuery<CourseBenefit[]>({
    queryKey: ["coursesbenefits"],
    queryFn: fetchCourseBenefit,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
