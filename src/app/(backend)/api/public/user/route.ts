import { NextResponse } from "next/server";
import { createUserSchema } from "@/backend/modules/user/user.schema";
import { UserController } from "@/backend/modules/user/user.controller";
// import { AppError } from "@/backend/lib/errors/appError";
// import { handleRoute } from "@/backend/lib/http/route.handler";
// import { ErrorCode } from "@/backend/lib/errors/errorCodes";
import { handleValidatedRoute } from "@/backend/lib/http/route.validator";

export async function GET() {
  try {
    return NextResponse.json(await UserController.getUsers(), {
      status: 200,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// GUT AF
export const POST = handleValidatedRoute(createUserSchema, async (data) => {
  const user = await UserController.createUser(data);
  return Response.json(user, { status: 201 });
});

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const parsedBody = createUserSchema.safeParse(body);

//     if (!parsedBody.success) {
//       return NextResponse.json(
//         { error: parsedBody.error.flatten() },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(await UserController.createUser(parsedBody.data), {
//       status: 201,
//     });
//   } catch (error) {
//     console.error(error);
//     if (error instanceof AppError) {
//       return NextResponse.json({ error: error.code }, { status: error.status });
//     } else {
//       return new Response("", { status: 500 });
//     }
//   }
// }
