import { ApiError } from "@/server/errors/api-error";
import { serverFetch } from "@/server/http/server-fetch";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function PUT(req: NextRequest, context: { params: Promise<{ courseFieldId: string }> }) {
  try {
    const { courseFieldId } = await context.params;
    const body = await req.json();

    const payload = {
      fieldName: body.field || body.fieldName,
    };

    await serverFetch(`/courses/courses-field/${courseFieldId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: true,
      data: null,
    });
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

export async function DELETE(req: NextRequest, context: { params: Promise<{ courseFieldId: string }> }) {
  try {
    const { courseFieldId } = await context.params;
    await serverFetch(`/courses/courses-field/${courseFieldId}`, {
      method: "DELETE",
    });

    return NextResponse.json({
      success: true,
      data: null,
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
