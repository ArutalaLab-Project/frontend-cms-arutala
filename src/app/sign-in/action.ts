import { ApiResponse } from "@/types/api";
import { SignInResponse } from "../api/auth/route";
import { User } from "@/types/user";

export async function loginAction(payload: { username: string; password: string }) {
  const res = await fetch(`/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const response = (await res.json()) as ApiResponse<SignInResponse>;

  if (!res.ok || !response.success) {
    throw new Error(response.message || "Sign In Gagal");
  }

  return response;
}

export async function logoutAction() {
  const res = await fetch(`/api/auth`, { method: "DELETE", credentials: "include" });
  const response = await res.json();

  if (!res.ok || !response.success) {
    throw new Error(response.message || "Sign Out Gagal");
  }

  return response;
}

export async function fetchUserAuthenticated(): Promise<User> {
  const res = await fetch("/api/auth", {
    method: "GET",
    credentials: "include",
  });

  const response = (await res.json()) as ApiResponse<User>;

  if (!res.ok || !response.success || response.data === undefined) {
    throw new Error(response.message);
  }

  return response.data;
}
