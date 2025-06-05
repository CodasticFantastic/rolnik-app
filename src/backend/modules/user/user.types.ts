import { UserRole } from "@prisma/client";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export interface SanitizedUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

export interface SignInUserInput {
  email: string;
  password: string;
}
