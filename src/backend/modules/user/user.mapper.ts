import { User as PrismaUser } from "@prisma/client";
import { SanitizedUser } from "./user.types";

export const userMapper = {
  sanitizedUserResponse: (u: PrismaUser): SanitizedUser => {
    return {
      id: u.id,
      email: u.email,
      name: u.name || null,
      role: u.role,
    } satisfies SanitizedUser;
  },
};
