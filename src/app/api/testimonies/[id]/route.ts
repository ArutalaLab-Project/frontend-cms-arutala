import { ApiResponse } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

const API_EXTERNAL = process.env.NEXT_API_EXTERNAL!;

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const { id } = await context.params;

  const formData = await req.formData();

  const res = await fetch(`${API_EXTERNAL}/testimonies/${id}`, {
    method: "PATCH", // atau POST jika external API memang pakai POST
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      // ❗ JANGAN SET Content-Type kalau kirim FormData
    },
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        statusCode: String(res.status),
        message: json.message ?? "Update failed",
      },
      { status: res.status },
    );
  }

  return NextResponse.json<ApiResponse>({
    success: true,
    message: json.message,
    data: null,
  });
}
