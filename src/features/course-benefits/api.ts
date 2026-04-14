import { clientApi } from "@/shared/lib/http/client-api";
import { CourseBenefit } from "./type";

export async function fetchCourseBenefit(): Promise<CourseBenefit[]> {
  return clientApi.get<CourseBenefit[]>("/api/courses/courses-benefit");
}

export async function updateCourseBenefit(id: string, payload: { title: string; description: string }) {
  return clientApi.put(`/api/courses/courses-benefit/${id}`, JSON.stringify(payload));
}

export async function deleteCourseBenefit(id: string) {
  return clientApi.delete(`/api/courses/courses-benefit/${id}`);
}

export async function createCourseBenefit(payload: { title: string; description: string }) {
  return clientApi.post(`/api/courses/courses-benefit`, JSON.stringify(payload));
}
