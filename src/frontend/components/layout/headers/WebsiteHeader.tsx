import { Button } from "@/frontend/components/shadcn/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../shadcn/badge";

export const HeaderWebsite = () => {
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
        <Link href="/auth/sign-up">
          <Button variant="outlinePrimary" className="cursor-pointer">
            Zarejestruj się
          </Button>
        </Link>
        <Link href="/auth/sign-in">
          <Button className="cursor-pointer">Zaloguj się</Button>
        </Link>
      </div>
    </header>
  );
};
