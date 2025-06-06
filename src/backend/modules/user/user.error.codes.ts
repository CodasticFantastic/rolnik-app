import { AppErrorShape } from "@/backend/lib/errors/app.error";

export enum UserErrorCode {
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
}

export const userError: Record<UserErrorCode, AppErrorShape<UserErrorCode>> = {
  [UserErrorCode.USER_ALREADY_EXISTS]: {
    errorCode: UserErrorCode.USER_ALREADY_EXISTS,
    status: 409,
  },
};

export const userErrorMessage: Record<UserErrorCode, string> = {
  [UserErrorCode.USER_ALREADY_EXISTS]:
    "Użytkownik o podanym adresie email już istnieje",
};
