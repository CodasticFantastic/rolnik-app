import { NextRequest } from "next/server";
import { adminPanelMiddleware } from "./frontend/middleware/adminPanel.middleware";
import { clientPanelMiddleware } from "./frontend/middleware/clientPanel.middleware";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.info("MIDDLEWARE_FIRED_FOR", path);

  if (path.startsWith("/admin-panel")) {
    return adminPanelMiddleware(request);
  }

  if (path.startsWith("/client-panel")) {
    return clientPanelMiddleware(request);
  }
}

export const config = {
  matcher: ["/admin-panel/:path*", "/client-panel/:path*"],
};
