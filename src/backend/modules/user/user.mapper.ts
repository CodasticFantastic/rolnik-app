import { User as PrismaUser } from "@prisma/client";
import { User } from "./user.types";

export const toUserResponse = (u: PrismaUser): User => ({
  id: u.id,
  email: u.email,
  name: u.name ?? "",
  role: u.role,
  createdAt: u.createdAt,
});
