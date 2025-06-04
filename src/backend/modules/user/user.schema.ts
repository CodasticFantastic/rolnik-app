import { z } from "zod";
import type { CreateUserInput, UpdateUserInput, User } from "./user.types";

// surowy obiekt
const baseUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(["ADMIN", "LOW_PRIVILEGED_USER"]),
  createdAt: z.date(),
});

// rzutowanie typów (ale bez łamania metod Zod)
export const userSchema: z.ZodType<User> = baseUserSchema;
export const createUserSchema: z.ZodType<CreateUserInput> = baseUserSchema.omit(
  { id: true, createdAt: true }
);
export const updateUserSchema: z.ZodType<UpdateUserInput> = baseUserSchema
  .partial()
  .extend({ id: z.string().uuid() });
