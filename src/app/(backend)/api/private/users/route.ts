import { requireRole } from "@/backend/auth/auth.guard";
import { UserController } from "@/backend/modules/user/user.controller";
import { handleGetRoute } from "@/backend/routeHandlers/get.route";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = handleGetRoute(async () => {
  await requireRole(UserRole.ADMIN);
  return NextResponse.json(await UserController.getUsers(), { status: 200 });
});
