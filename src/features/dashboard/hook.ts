import { useQuery } from "@tanstack/react-query";
import { Overview } from "./type";
import { fetchOverview } from "./api";

export function useOverview() {
  return useQuery<Overview>({
    queryKey: ["analytics"],
    queryFn: fetchOverview,
  });
}
