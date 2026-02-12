import { useQuery } from "@tanstack/react-query";
import { Page } from "./type";
import { fetchPages } from "./api";

export function usePages() {
  return useQuery<Page[]>({
    queryKey: ["pages"],
    queryFn: fetchPages,
  });
}
