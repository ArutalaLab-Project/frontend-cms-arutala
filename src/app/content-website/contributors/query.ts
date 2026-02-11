import { ApiResponse } from "@/types/api";
import { Contributor, CreateContributorInput } from "@/types/contributor";

export async function fetchContributors(): Promise<Contributor[]> {
  const res = await fetch("/api/contributors", {
    credentials: "include",
    cache: "no-store",
  });
  const json: ApiResponse<Contributor[]> = await res.json();
  if (!json.success) {
    throw new Error(json.message);
  }
  return json.data ?? [];
}

/* ---------- POST ---------- */
export async function createContributor(formData: FormData) {
  const res = await fetch("/api/contributors", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  return res.json();
}

/* ---------- UPDATE ---------- */
export async function updateContributor(id: string, data: CreateContributorInput) {
  const formData = new FormData();

  formData.append("contributorName", data.contributorName);
  formData.append("jobTitle", data.jobTitle);
  formData.append("companyName", data.companyName);
  formData.append("contributorType", data.contributorType);

  data.expertise.forEach((item) => {
    formData.append("expertise", item.value);
  });

  if (data.profile) {
    formData.append("profile", data.profile);
  }

  const res = await fetch(`/api/contributors/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData, // ✅ kirim FormData
  });

  // if (!res) {
  //   const error = await res.json();
  //   throw new Error(error.message);
  // }

  return res.json();
}

/* ---------- DELETE ---------- */
export async function deleteContributor(contributorId: string): Promise<ApiResponse<null>> {
  const res = await fetch("/api/contributors", {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contributorId }),
  });

  return res.json();
}
