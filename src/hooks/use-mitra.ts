import { createMitra, deleteMitra, fetchMitras, updateMitra } from "@/app/content-website/mitras/query";
import { CreateMitraInput, Mitra } from "@/types/mitra";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMitras() {
  return useQuery<Mitra[]>({
    queryKey: ["Mitras"],
    queryFn: fetchMitras,
  });
}

export function useCreateMitra() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMitra,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Mitras"] });
    },
  });
}

export function useUpdateMitra() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateMitraInput }) => updateMitra(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Mitras"],
      });
    },
  });
}

export function useDeleteMitra() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMitra,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Mitras"] });
    },
  });
}
