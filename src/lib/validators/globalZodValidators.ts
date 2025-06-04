// TODO:
//  - /lib/validators/user.ts
//  - /lib/validators/product.ts

import { z } from "zod";

export const globalZodValidators = {
  email: z.string().email("Niepoprawny adres email"),
  password: z.string().min(6, "Hasło powinno zawierać conajmniej 6 znaków"),
};
