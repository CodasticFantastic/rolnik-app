import { z } from "zod";
import { CreateUserInput, SignInUserInput } from "./user.types";

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

// Create user validator
const createUserValidatorShape = {
  email: userValidatorConfig.email,
  password: userValidatorConfig.password,
  repeatPassword: userValidatorConfig.repeatPassword,
  name: userValidatorConfig.name,
  phoneNumber: userValidatorConfig.phoneNumber,
  acceptedTermsOfService: userValidatorConfig.acceptedTermsOfService,
} satisfies Record<keyof CreateUserInput, z.ZodTypeAny>;

export const createUserValidator = z
  .object(createUserValidatorShape)
  .strict()
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Hasła nie pasują do siebie",
  });

// Sign in user validator
const signInUserValidatorShape = {
  email: userValidatorConfig.email,
  password: userValidatorConfig.password,
} satisfies Record<keyof SignInUserInput, z.ZodTypeAny>;

export const signInUserValidator = z.object(signInUserValidatorShape).strict();
