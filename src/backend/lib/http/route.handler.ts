import { NextRequest, NextResponse } from "next/server";
import { AppError } from "../errors/appError";
import { ErrorCode } from "../errors/errorCodes";

type Handler = (req: NextRequest) => Promise<Response>;

export function handleRoute(fn: Handler): Handler {
  return async (req: NextRequest) => {
    try {
      return await fn(req);
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json(
          { error: error.code },
          { status: error.status }
        );
      }

      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: ErrorCode.UNKNOWN_ERROR },
        { status: 500 }
      );
    }
  };
}
