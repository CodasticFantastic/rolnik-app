import {
  AppError,
  AppErrorHttpResponseObject,
  DevelopmentAppErrorHttpResponseObject,
} from "@/backend/lib/errors/app.error";
import { GlobalErrorCode } from "@/backend/lib/errors/global.error.codes";
import { NextResponse } from "next/server";

/**
 * Global custom error handler for all kind of routes.
 */

export function handleRouteError(error: unknown): Response {
  if (error instanceof AppError) {
    return NextResponse.json(
      process.env.NODE_ENV === "production"
        ? ({
            error: error.errorCode,
            status: error.status,
          } satisfies AppErrorHttpResponseObject)
        : ({
            error: error.errorCode,
            status: error.status,
            details: error.details,
          } satisfies DevelopmentAppErrorHttpResponseObject),
      { status: error.status }
    );
  }

  console.error("Unexpected error:", error);
  return NextResponse.json(
    { error: GlobalErrorCode.UNKNOWN_ERROR },
    { status: 500 }
  );
}
