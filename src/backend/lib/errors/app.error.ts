import { UserErrorCode } from "@/backend/modules/user/user.error.codes";
import { GlobalErrorCode } from "./global.error.codes";

type AppErrorCodes = GlobalErrorCode | UserErrorCode;

export type AppErrorShape<T = AppErrorCodes> = {
  errorCode: T;
  status: number;
};

export type AppErrorHttpResponseObject = {
  error: AppErrorCodes;
  status: number;
};

export type DevelopmentAppErrorHttpResponseObject =
  AppErrorHttpResponseObject & { details?: unknown };

export class AppError extends Error {
  public readonly errorCode: AppErrorCodes;
  public readonly status: number;
  public readonly details?: unknown;

  constructor(props: AppErrorShape & { details?: unknown }) {
    super(props.errorCode);

    this.name = "AppError";
    this.errorCode = props.errorCode;
    this.status = props.status;
    this.details = props.details;

    Object.assign(this, props);

    console.error(`[AppError] ${props.errorCode} (${props.status})`);

    if (process.env.NODE_ENV !== "production" && props.details) {
      console.error(props.details);
    }
  }
}
