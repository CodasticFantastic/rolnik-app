import { User as PrismaUser } from "@prisma/client";
import { SanitizedUserResponse } from "./user.types";

export const userMapper = {
  sanitizedUserResponse: (u: PrismaUser): SanitizedUserResponse => {
    return {
      id: u.id,
      email: u.email,
      name: u.name || null,
      role: u.role,
      createdAt: u.createdAt,
    };
  },
};
