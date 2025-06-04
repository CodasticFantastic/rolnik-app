import { ZodSchema, ZodTypeAny } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { AppError } from "../errors/appError";
import { ErrorCode } from "../errors/errorCodes";

type ValidatedHandler<T> = (data: T, req: NextRequest) => Promise<Response>;

export function handleValidatedRoute<T extends ZodTypeAny>(
  schema: ZodSchema<T["_output"]>,
  handler: ValidatedHandler<T["_output"]>
) {
  return async function (req: NextRequest): Promise<Response> {
    try {
      const body = await req.json();
      const result = schema.safeParse(body);

      if (!result.success) {
        throw new AppError(ErrorCode.INVALID_INPUT, 400);
      }

      return await handler(result.data, req);
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
