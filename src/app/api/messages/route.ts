import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api";
import { Message } from "@/types/message";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  // console.log(accessToken);

  const res = await fetch(`${API_URL}/messages`, {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  const resJson = (await res.json()) as ApiResponse<Message[]>;

  return NextResponse.json(resJson, { status: res.status });
}

export async function DELETE(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const { messageId } = await req.json();

  const res = await fetch(`${API_URL}/messages/${messageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  const resJson = (await res.json()) as ApiResponse<null>;

  return NextResponse.json(resJson, { status: res.status });
}
