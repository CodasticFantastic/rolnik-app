import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { SignInForm } from "./components/SignInForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-[calc(100vh-3.75rem)] flex items-center justify-center bg-background">
      <div className="w-1/2 flex flex-col items-center gap-4">
        <Card className="w-full max-w-sm shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              <p className="text-xl mb-1">Zaloguj się</p>
              <p className="text-muted-foreground">
                Nie posiadasz jeszcze konta?
                <br />
                <Link
                  href="/auth/sign-up"
                  className="text-muted-foreground hover:text-secondary"
                >
                  Zarejestruj się!
                </Link>
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </div>
      <div className="w-1/2 h-full bg-muted flex items-center justify-center shadow-sm">
        <div>Place for Banner</div>
      </div>
    </div>
  );
}
