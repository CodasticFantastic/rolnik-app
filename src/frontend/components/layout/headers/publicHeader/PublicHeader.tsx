"use client";

import { Button } from "@/frontend/components/shadcn/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../../shadcn/badge";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

export const PublicHeader = () => {
  return (
    <SessionProvider>
      <PublicHeaderContent />
    </SessionProvider>
  );
};

const PublicHeaderContent = () => {
  const { data: session } = useSession();

  return (
    <header className="w-full px-4 flex h-14 items-center justify-between border-b-1">
      <div className="flex items-center gap-2">
        <Link href="/" className="relative">
          <Image
            src={"/branding/logo.png"}
            alt="Logo Rolnik App"
            width={120}
            height={24}
          />
          <Badge
            variant="ghost"
            className="absolute top-[-13px] right-[-2px] font-extrabold"
          >
            BETA
          </Badge>
        </Link>
        <p className="text-xs text-muted-foreground font-semibold">
          Internetowe Centrum Rolnicze
        </p>
      </div>
      <div className="flex gap-x-2">
        {!session && (
          <>
            <Link href="/auth/sign-up">
              <Button variant="outlinePrimary" className="cursor-pointer">
                Zarejestruj się
              </Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button className="cursor-pointer">Zaloguj się</Button>
            </Link>
          </>
        )}
        {session && (
          <div className="flex gap-x-2 items-center">
            <p>{session.user.role}</p>
            {session.user.role === UserRole.ADMIN && (
              <Link href="/admin-panel">
                <Button variant="outlinePrimary" className="cursor-pointer">
                  Panel administratora
                </Button>
              </Link>
            )}
            {session.user.role === UserRole.LOW_PRIVILEGED_USER && (
              <Link href="/client-panel">
                <Button variant="outlinePrimary" className="cursor-pointer">
                  Mój panel
                </Button>
              </Link>
            )}
            <Button
              onClick={() => signOut()}
              variant="destructive"
              className="cursor-pointer"
            >
              Wyloguj
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
