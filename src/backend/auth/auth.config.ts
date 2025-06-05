import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { prisma } from "@/backend/lib/prisma/prisma.client";
import { verifyPassword } from "@/backend/auth/auth.helpers";
import {
  SanitizedUser,
  SignInUserInput,
} from "@/backend/modules/user/user.types";
import { userMapper } from "@/backend/modules/user/user.mapper";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<SanitizedUser | null> {
        const { email, password } = credentials as SignInUserInput;

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) return null;

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) return null;

        return userMapper.sanitizedUserResponse(user);
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as SanitizedUser["role"];
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
