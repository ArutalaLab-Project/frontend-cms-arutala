import { createTestimoni, deleteTestimoni, fetchTestimonies, updateTestimoni } from "@/app/content-website/testimonies/query";
import { CreateTestimoniInput, Testimoni } from "@/types/testimoni";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTestimonies() {
  return useQuery<Testimoni[]>({
    queryKey: ["Testimonies"],
    queryFn: fetchTestimonies,
  });
}

export function useCreateTestimoni() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTestimoni,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Testimonies"] });
    },
  });
}

export function useUpdateTestimoni() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateTestimoniInput }) => updateTestimoni(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Testimonies"],
      });
    },
  });
}

export function useDeleteTestimoni() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTestimoni,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Testimonies"] });
    },
  });
}
