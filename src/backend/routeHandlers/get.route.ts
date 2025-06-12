import { ZodTypeAny, z } from "zod";
import { NextRequest } from "next/server";
import { AppError } from "@/backend/lib/errors/app.error";
import { globalError } from "@/backend/lib/errors/global.error.codes";
import { handleRouteError } from "./error.route";

type GetHandlerNoValidation = (req: NextRequest) => Promise<Response>;

type GetHandlerWithQueryValidation<T extends ZodTypeAny> = (
  data: z.infer<T>,
  req: NextRequest
) => Promise<Response>;

// Overloads
export function handleGetRoute<T extends ZodTypeAny>(
  schema: T,
  handler: GetHandlerWithQueryValidation<T>
): (req: NextRequest) => Promise<Response>;

export function handleGetRoute(
  handler: GetHandlerNoValidation
): (req: NextRequest) => Promise<Response>;

// Implementation
export function handleGetRoute<T extends ZodTypeAny>(
  schemaOrHandler: T | GetHandlerNoValidation,
  maybeHandler?: GetHandlerWithQueryValidation<T>
): (req: NextRequest) => Promise<Response> {
  const hasSchema = typeof schemaOrHandler !== "function";

  return async function (req: NextRequest): Promise<Response> {
    try {
      if (!hasSchema) {
        const handler = schemaOrHandler as GetHandlerNoValidation;
        return await handler(req);
      }

      const schema = schemaOrHandler;
      const handler = maybeHandler as GetHandlerWithQueryValidation<T>;

      const queryParams: Record<string, string> = {};
      req.nextUrl.searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });

      const parsed = schema.safeParse(queryParams);
      if (!parsed.success) {
        throw new AppError({
          ...globalError.INVALID_INPUT,
          details: parsed.error.flatten(),
        });
      }

      return await handler(parsed.data, req);
    } catch (error) {
      return handleRouteError(error);
    }
  };
}
