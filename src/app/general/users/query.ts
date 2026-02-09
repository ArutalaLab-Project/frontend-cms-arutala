import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("api/users", {
    credentials: "include",
    cache: "no-store",
  });
  const json: ApiResponse<User[]> = await res.json();
  if (!json.success) {
    throw new Error(json.message);
  }

  return json.data ?? [];
}
