import { createContributor, deleteContributor, fetchContributors, updateContributor } from "@/app/content-website/contributors/query";
import { Contributor, CreateContributorInput } from "@/types/contributor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useContributors() {
  return useQuery<Contributor[]>({
    queryKey: ["Contributors"],
    queryFn: fetchContributors,
  });
}

export function useCreateContributor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createContributor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Contributors"] });
    },
  });
}

export function useUpdateContributor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateContributorInput }) => updateContributor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Contributors"],
      });
    },
  });
}

export function useDeleteContributor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContributor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Contributors"] });
    },
  });
}
