import { z } from "zod";

export const createUserValidator = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
  })
  .strict();
