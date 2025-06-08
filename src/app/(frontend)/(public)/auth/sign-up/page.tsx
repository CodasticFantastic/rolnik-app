import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/frontend/components/shadcn/card";
import Link from "next/link";
import { SignUpForm } from "./components/SignUpForm";

export default function RegisterPage() {
  return (
    <div className="h-[calc(100vh-3.75rem)] flex items-center justify-center bg-background">
      <div className="w-1/2 h-full bg-muted flex items-center justify-center shadow-sm">
        <div>Place for Banner</div>
      </div>
      <div className="w-1/2 flex flex-col items-center gap-4">
        <Card className="w-full max-w-sm shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              <p className="text-xl mb-1 text-primary font-bold">
                Zarejestruj się
              </p>
              <p className="text-muted-foreground">
                Posiadasz już konto?
                <br />
                <Link
                  href="/auth/sign-in"
                  className="text-muted-foreground hover:text-secondary"
                >
                  Zaloguj się!
                </Link>
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
