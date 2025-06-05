import { CreateUserInput } from "./user.types";
import { prisma } from "@/backend/lib/prisma/prisma.client";
import { AppError } from "@/backend/lib/errors/app.error";
import { userError } from "./user.error.codes";

export const userService = {
  async getAll() {
    return await prisma.user.findMany();
  },

  async create(data: CreateUserInput) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new AppError({ ...userError.USER_ALREADY_EXISTS });
    }

    return await prisma.user.create({ data });
  },

  // możesz dodać update, delete itd.
};
