import { ApiResponse } from "@/types/api";
import { CreateTestimoniInput, Testimoni } from "@/types/testimoni";

export async function fetchTestimonies(): Promise<Testimoni[]> {
  const res = await fetch("/api/testimonies", {
    credentials: "include",
    cache: "no-store",
  });
  const json: ApiResponse<Testimoni[]> = await res.json();
  if (!json.success) {
    throw new Error(json.message);
  }
  return json.data ?? [];
}

/* ---------- POST ---------- */
export async function createTestimoni(formData: FormData) {
  const res = await fetch("/api/testimonies", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  return res.json();
}

/* ---------- UPDATE ---------- */
export async function updateTestimoni(id: string, data: CreateTestimoniInput) {
  const formData = new FormData();

  formData.append("authorName", data.authorName);
  formData.append("authorJobTitle", data.authorJobTitle);
  formData.append("authorCompanyName", data.authorCompanyName);
  formData.append("testimoniCategory", data.testimoniCategory);
  formData.append("testimoniContent", data.testimoniContent);

  if (data.authorProfile) {
    formData.append("profile", data.authorProfile);
  }

  const res = await fetch(`/api/testimonies/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData, // ✅ kirim FormData
  });

  return res.json();
}

/* ---------- DELETE ---------- */
export async function deleteTestimoni(testimoniId: string): Promise<ApiResponse<null>> {
  const res = await fetch("/api/testimonies", {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ testimoniId }),
  });

  return res.json();
}
