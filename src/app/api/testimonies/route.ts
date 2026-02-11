import { ResponseError, ResponseSuccess } from "@/lib/http/response";
import { ApiResponse } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

const API_EXTERNAL = process.env.NEXT_API_EXTERNAL!;

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const res = await fetch(`${API_EXTERNAL}/testimonies`, {
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
  const json = await res.json();

  if (!res.ok) {
    return ResponseError(json.message ?? "Failed to fetch data", json.status);
  }
  return ResponseSuccess(json.data, json.message);
}

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const requestBody = await req.formData();

  const res = await fetch(`${API_EXTERNAL}/testimonies`, {
    method: "POST",
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: requestBody,
  });

  const json = await res.json();

  if (!res.ok) {
    return ResponseError(json.message ?? "Update Testimoni Failed", json.status);
  }

  return ResponseSuccess(null, json.message);
}

export async function DELETE(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const { testimoniId } = await req.json();

  const res = await fetch(`${API_EXTERNAL}/testimonies/${testimoniId}`, {
    method: "DELETE",
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  const json = await res.json();

  if (!res.ok) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        statusCode: String(res.status),
        message: json.message ?? "Delete failed",
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
