import { z } from "zod";
import { CreateUserInput, SignInUserInput } from "./user.types";

// Validator Config
const userValidatorConfig = {
  email: z.string().nonempty("Email jest wymagany").email("Niepoprawny email"),
  password: z
    .string()
    .nonempty("Hasło jest wymagane")
    .min(6, "Hasło musi składać się z co najmniej 6 znaków"),
  repeatPassword: z.string().nonempty("Potwierdź swoje hasło"),
  name: z.string().nonempty("Imię jest wymagane"),
  phoneNumber: z
    .string()
    .nonempty("Numer telefonu jest wymagany")
    .regex(
      /^\+?\d+$/,
      "Numer telefonu może zawierać tylko cyfry oraz opcjonalnie znak '+' na początku"
    ),
  acceptedTermsOfService: z.boolean().refine((value) => value === true, {
    message: "Musisz zaakceptować regulamin",
  }),
};

// Validators
export const createUserValidator = z
  .object({
    email: userValidatorConfig.email,
    password: userValidatorConfig.password,
    repeatPassword: userValidatorConfig.repeatPassword,
    name: userValidatorConfig.name,
    phoneNumber: userValidatorConfig.phoneNumber,
    acceptedTermsOfService: userValidatorConfig.acceptedTermsOfService,
  } satisfies Record<keyof CreateUserInput, z.ZodTypeAny>)
  .strict()
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Hasła nie pasują do siebie",
  });

export const signInUserValidator = z
  .object({
    email: userValidatorConfig.email,
    password: userValidatorConfig.password,
  } satisfies Record<keyof SignInUserInput, z.ZodTypeAny>)
  .strict();
