import { clientApi } from "@/shared/lib/http/client-api";
import { Overview } from "./type";

/* ---------- GET ---------- */
export async function fetchOverview(): Promise<Overview> {
  return await clientApi.get<Overview>("/api/analytics");
}
