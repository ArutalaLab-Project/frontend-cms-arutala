import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCourseField, deleteCourseField, fetchCourseField, updateCourseField } from "./api";
import { CourseField } from "./type";

export function useCourseField() {
  return useQuery<CourseField[]>({
    queryKey: ["coursesfield"],
    queryFn: fetchCourseField,
  });
}

export function useUpdateCourseField() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { fieldName: string } }) => updateCourseField(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coursesfield"] });
    },
  });
}

export function useDeleteCourseField() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCourseField(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coursesfield"] });
    },
  });
}

export function useCreateCourseField() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { fieldName: string }) => createCourseField(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coursesfield"] });
    },
  });
}
