import { CourseBenefit } from "@/features/course-benefits";
import { ApiError } from "@/server/errors/api-error";
import { serverFetch } from "@/server/http/server-fetch";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  try {
    const courseBenefits = await serverFetch<CourseBenefit[]>("/courses/courses-benefit/");
    return NextResponse.json({
      success: true,
      data: courseBenefits,
    });
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      title: body.title,
      description: body.description,
    };

    await serverFetch<null>("/courses/courses-benefit", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const response = NextResponse.json({
      success: true,
      data: null,
    });
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.cause,
        },
        { status: 400 },
      );
    }

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
