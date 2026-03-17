import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Seo } from "./type";
import { changeStatusSeo, createSeoInPage, deleteSeo, fetchSeo, updateDetailSeo, updateSeoCover } from "./api";

export function useSeos(pageId: string) {
  return useQuery<Seo[]>({
    queryKey: ["seos", pageId],
    queryFn: () => fetchSeo(pageId),
  });
}

export function useCreateSeo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pageId, body }: { pageId: string; body: FormData }) => createSeoInPage(pageId, body),
    onSuccess: (_, { pageId }) => {
      queryClient.invalidateQueries({ queryKey: ["seos", pageId] });
    },
  });
}

export function useChangeStatusSeo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pageId, seoId }: { pageId: string; seoId: string }) => changeStatusSeo(pageId, seoId),
    onSuccess: (_, { pageId }) => {
      queryClient.invalidateQueries({ queryKey: ["seos", pageId] });
    },
  });
}
export function useUpdateDetailSeo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pageId, seoId, body }: { pageId: string; seoId: string; body: FormData }) => updateDetailSeo(pageId, seoId, body),
    onSuccess: (_, { pageId }) => {
      queryClient.invalidateQueries({ queryKey: ["seos", pageId] });
    },
  });
}

export function useUpdateSeoCover() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pageId, seoId, body }: { pageId: string; seoId: string; body: FormData }) => updateSeoCover(pageId, seoId, body),
    onSuccess: (_, { pageId }) => {
      queryClient.invalidateQueries({ queryKey: ["seos", pageId] });
    },
  });
}
export function useDeleteSeo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pageId, seoId }: { pageId: string; seoId: string }) => deleteSeo(pageId, seoId),
    onSuccess: (_, { pageId }) => {
      queryClient.invalidateQueries({ queryKey: ["seos", pageId] });
    },
  });
}
