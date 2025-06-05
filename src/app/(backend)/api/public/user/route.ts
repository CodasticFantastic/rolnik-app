import { NextResponse } from "next/server";
import { createUserSchema } from "@/backend/modules/user/user.schema";
import { UserController } from "@/backend/modules/user/user.controller";
import { handleGetRoute } from "@/backend/lib/http/route.get";
import { handlePostRoute } from "@/backend/lib/http/route.post";

export const GET = handleGetRoute(async () => {
  return NextResponse.json(await UserController.getUsers(), { status: 200 });
});

export const POST = handlePostRoute(createUserSchema, async (data) => {
  return NextResponse.json(await UserController.createUser(data), {
    status: 201,
  });
});
