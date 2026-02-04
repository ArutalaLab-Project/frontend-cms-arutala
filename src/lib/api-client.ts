// lib/api-client.ts
import { cookies } from "next/headers";

const { NEXT_PUBLIC_API_URL } = process.env;

// export interface AuthResponse {
//   success: false;
//   data: [];
// }

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // Handle 401 - token expired
  //   if (response.status === 401) {
  //     const refreshToken = cookieStore.get("refreshToken")?.value;

  //     if (refreshToken) {
  //       // Try to refresh token
  //       const refreshResponse = await fetch(`${NEXT_PUBLIC_API_URL}/auth/refresh`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ refreshToken }),
  //       });

  //       if (refreshResponse.ok) {
  //         const { data } = await refreshResponse.json();

  //         cookieStore.set("accessToken", data.access_token, {
  //           httpOnly: true,
  //           secure: process.env.NODE_ENV === "production",
  //           sameSite: "lax",
  //           maxAge: 60 * 60,
  //         });

  //         // Retry original request
  //         return fetch(`${NEXT_PUBLIC_API_URL}${endpoint}`, {
  //           ...options,
  //           headers: {
  //             ...options.headers,
  //             Authorization: `Bearer ${data.access_token}`,
  //           },
  //         });
  //       }
  //     }
  //   }

  return response;
}
