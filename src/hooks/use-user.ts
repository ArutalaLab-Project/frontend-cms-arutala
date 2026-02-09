import { fetchUsers } from "@/app/general/users/query";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["Users"],
    queryFn: fetchUsers,
  });
}
