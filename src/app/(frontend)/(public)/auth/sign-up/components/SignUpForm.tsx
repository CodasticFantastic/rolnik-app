"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/frontend/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/frontend/components/shadcn/form";
import { Input } from "@/frontend/components/shadcn/input";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/frontend/components/shadcn/alert";
import { Checkbox } from "@/frontend/components/shadcn/checkbox";
import {
  UserErrorCode,
  userErrorMessage,
} from "@/backend/modules/user/user.error.codes";
import { createUserValidator } from "@/backend/modules/user/user.validator";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [responseFormError, setResponseFormError] = useState<false | string>(
    false
  );
  const form = useForm<z.infer<typeof createUserValidator>>({
    resolver: zodResolver(createUserValidator),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      acceptedTermsOfService: false,
    },
  });

  async function onSubmit(values: z.infer<typeof createUserValidator>) {
    setIsLoading(true);
    setResponseFormError(false);

    try {
      const response = await fetch("/api/public/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();

        // TODO: Refactor this code
        setResponseFormError(userErrorMessage[error.error as UserErrorCode]);
      } else {
        router.push("/auth/sign-in");
        setResponseFormError(false);
      }
    } catch {
      setIsLoading(false);
      setResponseFormError("Wystąpił nieznany błąd");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Imię */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jak masz na imie?</FormLabel>
              <FormControl>
                <Input placeholder="Miejsce na Twoje imię" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Phone */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jaki jest Twój numer telefonu?</FormLabel>
              <FormControl>
                <Input
                  placeholder="Miejsce na Twój numer telefonu"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jaki jest Twój email?</FormLabel>
              <FormControl>
                <Input placeholder="Miejsce na Twój email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ustaw swoje hasło</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Użyj bezpiecznego hasła"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password Repeat */}
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potwierdź swoje hasło</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Potwierdź swoje hasło"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Acceptance Terms of service */}
        <FormField
          control={form.control}
          name="acceptedTermsOfService"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  Akceptuję regulamin i politykę prywatności
                </FormLabel>
                <FormMessage className="font-bold" />
              </div>
            </FormItem>
          )}
        />
        {/* Alert */}
        {responseFormError && (
          <Alert variant="error">
            <AlertCircleIcon />
            <AlertTitle>Błąd tworzenia konta</AlertTitle>
            <AlertDescription>
              <p>{responseFormError}</p>
            </AlertDescription>
          </Alert>
        )}
        {/* Submit */}
        <Button type="submit" className="w-full" isLoading={isLoading}>
          Zaloguj
        </Button>
      </form>
      <div></div>
    </Form>
  );
};
