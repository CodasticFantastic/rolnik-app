import { ErrorCode } from "./errorCodes";

export const errorMap: Record<ErrorCode, { status: number }> = {
  [ErrorCode.USER_ALREADY_EXISTS]: { status: 409 },
  [ErrorCode.UNKNOWN_ERROR]: { status: 500 },
};
