import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCourseBenefit, deleteCourseBenefit, fetchCourseBenefit, updateCourseBenefit } from "./api";
import { CourseBenefit } from "./type";

export function useCourseBenefit() {
  return useQuery<CourseBenefit[]>({
    queryKey: ["coursesbenefits"],
    queryFn: fetchCourseBenefit,
  });
}

export function useUpdateCourseBenefit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { title: string; description: string } }) => updateCourseBenefit(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coursesbenefits"] });
    },
  });
}

export function useDeleteCourseBenefit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCourseBenefit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coursesbenefits"] });
    },
  });
}

export function useCreateCourseBenefit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { title: string; description: string }) => createCourseBenefit(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coursesbenefits"] });
    },
  });
}
