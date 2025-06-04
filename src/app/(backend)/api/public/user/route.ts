import { NextRequest, NextResponse } from "next/server";
import { createUserSchema } from "@/backend/modules/user/user.schema";
import { UserController } from "@/backend/modules/user/user.controller";

export async function GET() {
  try {
    const users = await UserController.getUsers();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = createUserSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.flatten() },
        { status: 400 }
      );
    }

    const user = await UserController.createUser(parsedBody.data);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
