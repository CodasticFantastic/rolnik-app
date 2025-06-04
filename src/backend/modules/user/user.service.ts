import { CreateUserInput } from "./user.types";
import { prisma } from "@/backend/lib/prisma/prisma.client";
import { toUserResponse } from "./user.mapper";
import { AppError } from "@/backend/lib/errors/appError";
import { ErrorCode } from "@/backend/lib/errors/errorCodes";

export const userService = {
  async create(data: CreateUserInput) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new AppError(ErrorCode.USER_ALREADY_EXISTS, 409);
    }

    const created = await prisma.user.create({ data });
    return toUserResponse(created);
  },

  async getAll() {
    const users = await prisma.user.findMany();
    return users.map(toUserResponse);
  },

  // możesz dodać update, delete itd.
};
