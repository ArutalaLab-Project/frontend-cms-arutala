/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/server/http/server-fetch";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/server/errors/api-error";

interface Params {
  path: string[];
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  return handleRequest(req, await params);
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  return handleRequest(req, await params);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<Params> }) {
  return handleRequest(req, await params);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  return handleRequest(req, await params);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  return handleRequest(req, await params);
}

async function handleRequest(req: NextRequest, { path }: Params) {
  const method = req.method;
  const fullPath = "/" + path.join("/");
  console.log(fullPath);

  try {
    let body: any = undefined;

    if (method !== "GET" && method !== "HEAD") {
      const contentType = req.headers.get("content-type") || "";

      if (contentType.includes("multipart/form-data")) {
        body = await req.formData();
      } else {
        const rawBody = await req.text();
        if (rawBody) {
          try {
            // Validate if it's JSON if needed, but for proxying text is fine if we set headers correctly
            // serverFetch expects string for JSON bodies
            body = rawBody;
          } catch {
            body = rawBody;
          }
        }
      }
    }

    // Special case for sign-out which might need refreshToken from cookie
    if (fullPath === "/auth/sign-out" && method === "DELETE") {
      const refreshToken = req.cookies.get("refreshToken")?.value;
      if (refreshToken) {
        body = JSON.stringify({ refresh_token: refreshToken });
      }
    }

    const data = await serverFetch<any>(fullPath, {
      method,
      body,
    });

    const response = NextResponse.json({
      success: true,
      data,
    });

    // Special logic for Auth: Sign In
    if (fullPath === "/auth/sign-in" && method === "POST") {
      response.cookies.set("accessToken", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
        path: "/",
      });
      response.cookies.set("refreshToken", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return NextResponse.json(
        {
          success: true,
          message: "Login Successfully",
        },
        {
          headers: response.headers,
        },
      );
    }

    // Special logic for Auth: Sign Out
    if (fullPath === "/auth/sign-out" && method === "DELETE") {
      response.cookies.set("accessToken", "", {
        expires: new Date(0),
        path: "/",
      });
      response.cookies.set("refreshToken", "", {
        expires: new Date(0),
        path: "/",
      });

      return NextResponse.json(
        {
          success: true,
          message: "Logout Berhasil",
        },
        {
          headers: response.headers,
        },
      );
    }

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: error.status },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
