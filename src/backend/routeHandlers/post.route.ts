import { ZodTypeAny, z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import {
  AppError,
  AppErrorHttpResponseObject,
  DevelopmentAppErrorHttpResponseObject,
} from "@/backend/lib/errors/app.error";
import {
  GlobalErrorCode,
  globalError,
} from "@/backend/lib/errors/global.error.codes";

type PostRouteHandler<T extends ZodTypeAny> = (
  data: z.infer<T>,
  req: NextRequest
) => Promise<Response>;

export function handlePostRoute<T extends ZodTypeAny>(
  schemaToValidate: T,
  handler: PostRouteHandler<T>
): (req: NextRequest) => Promise<Response> {
  return async function (req: NextRequest): Promise<Response> {
    try {
      let body: unknown;

      try {
        body = await req.json();
      } catch {
        throw new AppError({ ...globalError.INVALID_JSON });
      }

      const parsed = schemaToValidate.safeParse(body);

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
  };
}
