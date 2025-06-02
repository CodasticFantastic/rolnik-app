import { Button } from "@/components/shadcn/button";
import Image from "next/image";
import Link from "next/link";

export const HeaderWebsite = () => {
  return (
    <header className="w-full px-4 flex h-14 items-center justify-between border-b-1">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src={"/branding/logo.png"}
            alt="Logo Rolnik App"
            width={120}
            height={24}
          />
        </Link>
        <p className="text-xs text-muted-foreground font-semibold">
          Internetowe Centrum Rolnicze
        </p>
      </div>
      <div>
        <Link href="/auth/sign-in">
          <Button variant="outlinePrimary" className="cursor-pointer">
            Zaloguj się
          </Button>
        </Link>
      </div>
    </header>
  );
};
