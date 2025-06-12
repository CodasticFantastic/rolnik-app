import { requireRole } from "@/backend/auth/auth.guard";
import { userService } from "@/backend/modules/user/user.service";
import { handleGetRoute } from "@/backend/routeHandlers/get.route";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = handleGetRoute(async () => {
  await requireRole(UserRole.ADMIN);
  return NextResponse.json(await userService.getAllUsers(), { status: 200 });
});
