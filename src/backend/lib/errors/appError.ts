import { ErrorCode } from "./errorCodes";

export class AppError extends Error {
  constructor(public readonly code: ErrorCode, public readonly status: number) {
    super(code);
  }
}
