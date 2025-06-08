import { UserController } from "@/backend/modules/user/user.controller";
import { handleGetRoute } from "@/backend/routeHandlers/get.route";
import { NextResponse } from "next/server";

export const GET = handleGetRoute(async () => {
  return NextResponse.json(await UserController.getUsers(), { status: 200 });
});
