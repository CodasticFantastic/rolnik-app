import { DefaultSession, DefaultUser } from "next-auth";
import { SanitizedUser } from "@/backend/modules/user/user.types";

// Rozszerzenie typu session.user
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: SanitizedUser["role"];
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: SanitizedUser["role"];
  }
}

// Rozszerzenie typu JWT
declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    role: SanitizedUser["role"];
  }
}
