import { clientApi } from "@/shared/lib/http/client-api";
import { User } from "@/features/user";

/* ---------- POST ---------- */
export async function loginAction(payload: { username: string; password: string }) {
  return clientApi.post<{
    access_token: string;
    refresh_token: string;
  }>("/api/auth/sign-in", JSON.stringify(payload));
}

/* ---------- DELETE ---------- */
export async function logoutAction() {
  return clientApi.delete<null>("/api/auth/sign-out");
}

/* ---------- GET ---------- */
export async function fetchUserAuthenticated(): Promise<User> {
  return clientApi.get<User>("/api/auth/me");
}
