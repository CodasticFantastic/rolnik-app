import { ZodTypeAny, z } from "zod";
import { NextRequest } from "next/server";
import { AppError } from "@/backend/lib/errors/app.error";
import { globalError } from "@/backend/lib/errors/global.error.codes";
import { handleRouteError } from "./error.route";

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

      // Check if the request body is JSON
      try {
        body = await req.json();
      } catch {
        throw new AppError({ ...globalError.INVALID_JSON });
      }

      // Validate JSON body against ZOD schema
      const parsed = schemaToValidate.safeParse(body);
      if (!parsed.success) {
        throw new AppError({
          ...globalError.INVALID_INPUT,
          details: parsed.error.flatten(),
        });
      }

      // Run handler
      return await handler(parsed.data, req);
    } catch (error) {
      return handleRouteError(error);
    }
  };
}
