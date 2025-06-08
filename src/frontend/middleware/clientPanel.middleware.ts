import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

export async function clientPanelMiddleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isClient = token?.role === UserRole.LOW_PRIVILEGED_USER;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (!isClient) {
    return NextResponse.redirect(new URL("/admin-panel", request.url));
  }

  return NextResponse.next();
}
