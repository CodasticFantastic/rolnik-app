import { AuthSessionUser } from "./auth.types";
import { globalError } from "../errors/global.error.codes";
import { auth } from "./auth";
import { AppError } from "../errors/app.error";

export async function requireAuth(): Promise<AuthSessionUser> {
  const session = await auth();

  if (!session?.user) {
    throw new AppError({ ...globalError.UNAUTHORIZED });
  }

  return session.user;
}

export async function requireRole(
  requiredRole: AuthSessionUser["role"]
): Promise<AuthSessionUser> {
  const user = await requireAuth();

  if (user.role !== requiredRole) {
    throw new AppError({ ...globalError.FORBIDDEN });
  }

  return user;
}

export async function requireRoles(
  allowedRoles: AuthSessionUser["role"][]
): Promise<AuthSessionUser> {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    throw new AppError({ ...globalError.FORBIDDEN });
  }

  return user;
}
