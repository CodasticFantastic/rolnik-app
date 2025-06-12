import { NextResponse } from "next/server";
import { createUserValidator } from "@/backend/modules/user/user.validator";
import { handlePostRoute } from "@/backend/routeHandlers/post.route";
import { userService } from "@/backend/modules/user/user.service";

// Create Low Privileged User (Sign Up)
export const POST = handlePostRoute(createUserValidator, async (data) => {
  return NextResponse.json(await userService.register(data), {
    status: 201,
  });
});
