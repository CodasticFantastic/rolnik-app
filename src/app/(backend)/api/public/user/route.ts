import { NextResponse } from "next/server";
import { createUserValidator } from "@/backend/modules/user/user.validator";
import { UserController } from "@/backend/modules/user/user.controller";
import { handleGetRoute } from "@/backend/lib/routeHandlers/get.route";
import { handlePostRoute } from "@/backend/lib/routeHandlers/post.route";

export const GET = handleGetRoute(async () => {
  return NextResponse.json(await UserController.getUsers(), { status: 200 });
});

export const POST = handlePostRoute(createUserValidator, async (data) => {
  return NextResponse.json(await UserController.createUser(data), {
    status: 201,
  });
});
