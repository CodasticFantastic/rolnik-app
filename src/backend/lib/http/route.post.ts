import { ZodTypeAny, z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { AppError } from "../errors/app.error";
import {
  GlobalErrorCode,
  globalError,
} from "../errors/global.error.codes";

type PostHandler<T extends ZodTypeAny> = (
  data: z.infer<T>,
  req: NextRequest
) => Promise<Response>;

export function handlePostRoute<T extends ZodTypeAny>(
  schema: T,
  handler: PostHandler<T>
): (req: NextRequest) => Promise<Response> {
  return async function (req: NextRequest): Promise<Response> {
    try {
      let body: unknown;

      try {
        body = await req.json();
      } catch {
        throw new AppError({ ...globalError.INVALID_JSON });
      }

      const parsed = schema.safeParse(body);

      if (!parsed.success) {
        throw new AppError({
          ...globalError.INVALID_INPUT,
          details: parsed.error.flatten(),
        });
      }

      return await handler(parsed.data, req);
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json(
          process.env.NODE_ENV === "production"
            ? { error: error.errorCode }
            : { error: error.errorCode, details: error.details },
          { status: error.status }
        );
      }

      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: GlobalErrorCode.UNKNOWN_ERROR },
        { status: 500 }
      );
    }
  };
}
