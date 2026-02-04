// lib/auth.ts
import { cookies } from "next/headers";

const { NEXT_PUBLIC_API_URL } = process.env;

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  success: false;
  message?: string;
  data?: {
    access_token: string;
    refresh_token: string;
  };
  //   user: User;
  //   accessToken: string;
  //   refreshToken?: string;
}

export async function login(username: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${NEXT_PUBLIC_API_URL!}/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
}

export async function logout() {
  await fetch(`${NEXT_PUBLIC_API_URL}/auth/sign-out`);
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

// export async function getSession(): Promise<User | null> {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("accessToken")?.value;

//     if (!token) return null;

//     const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     });

//     if (!response.ok) return null;

//     return response.json();
//   } catch {
//     return null;
//   }
// }
