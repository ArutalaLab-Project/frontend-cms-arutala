// app/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login as apiLogin, logout as apiLogout } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const response = await apiLogin(username, password);

  if (response.success && response.data) {
    const cookieStore = await cookies();
    const { data } = response;

    // Set HTTP-only cookies
    cookieStore.set("accessToken", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    if (data.refresh_token) {
      cookieStore.set("refreshToken", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    return { success: true };
  } else {
    return { success: false, message: response.message };
  }
}

export async function logoutAction() {
  await apiLogout();
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/login");
}
