"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getSession, signIn } from "next-auth/react";
import { signInUserValidator } from "@/backend/modules/user/user.validator";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/frontend/components/shadcn/alert";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { UserRole } from "@prisma/client";

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseFormError, setResponseFormError] = useState(false);
  const form = useForm<z.infer<typeof signInUserValidator>>({
    resolver: zodResolver(signInUserValidator),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInUserValidator>) {
    setResponseFormError(false);
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.error) {
      setResponseFormError(true);
      setIsLoading(false);
    }

    const session = await getSession();

    if (!session) {
      return;
    }

    const userRole = session.user?.role;

    if (userRole === UserRole.ADMIN) {
      window.location.href = "/admin-panel";
    } else if (userRole === UserRole.LOW_PRIVILEGED_USER) {
      window.location.href = "/client-panel";
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Twój email" {...field} />
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
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Twoje hasło" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Alert */}
        {responseFormError && (
          <Alert variant="error">
            <AlertCircleIcon />
            <AlertTitle>Niepoprawne dane logowania</AlertTitle>
            <AlertDescription>
              <p>Twój email lub hasło są niepoprawne.</p>
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
