import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

export async function adminPanelMiddleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isAdmin = token?.role === UserRole.ADMIN;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (!isAdmin) {
    // TODO: Redirect to admin-panel for clients
    return NextResponse.redirect(new URL("/client-panel", request.url));
  }

  return NextResponse.next();
}
