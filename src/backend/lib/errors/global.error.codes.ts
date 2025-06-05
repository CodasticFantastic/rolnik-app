import { AppErrorShape } from "./app.error";

export enum GlobalErrorCode {
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  INVALID_INPUT = "INVALID_INPUT",
  INVALID_JSON = "INVALID_JSON",
}

export const globalError: Record<
  GlobalErrorCode,
  AppErrorShape<GlobalErrorCode>
> = {
  [GlobalErrorCode.UNKNOWN_ERROR]: {
    errorCode: GlobalErrorCode.UNKNOWN_ERROR,
    status: 500,
  },
  [GlobalErrorCode.UNAUTHORIZED]: {
    errorCode: GlobalErrorCode.UNAUTHORIZED,
    status: 401,
  },
  [GlobalErrorCode.FORBIDDEN]: {
    errorCode: GlobalErrorCode.FORBIDDEN,
    status: 403,
  },
  [GlobalErrorCode.INVALID_INPUT]: {
    errorCode: GlobalErrorCode.INVALID_INPUT,
    status: 400,
  },
  [GlobalErrorCode.INVALID_JSON]: {
    errorCode: GlobalErrorCode.INVALID_JSON,
    status: 400,
  },
};
