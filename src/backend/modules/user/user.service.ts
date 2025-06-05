import { CreateUserInput, SanitizedUser } from "./user.types";
import { prisma } from "@/backend/lib/prisma/prisma.client";
import { AppError } from "@/backend/lib/errors/app.error";
import { userError } from "./user.error.codes";
import { hashPassword } from "@/backend/auth/auth.helpers";
import { userMapper } from "./user.mapper";
import { UserRole } from "@prisma/client";

export const userService = {
  async getAllUsers(): Promise<SanitizedUser[]> {
    const users = await prisma.user.findMany({});

    return users.map(userMapper.sanitizedUserResponse);
  },

  async createLowPrivilegedUser(data: CreateUserInput): Promise<SanitizedUser> {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new AppError({ ...userError.USER_ALREADY_EXISTS });
    }

    const hashedPassword = await hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: UserRole.LOW_PRIVILEGED_USER,
      },
    });

    return userMapper.sanitizedUserResponse(newUser);
  },
};
