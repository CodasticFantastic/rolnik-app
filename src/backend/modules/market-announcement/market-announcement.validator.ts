import { z } from "zod";
import { CreateMarketAnnouncementInput } from "./market-announcement.types";

// Wartości enuma jako array
const listingTypes = ["BUY", "SELL"] as const;
const categories = [
  "GRAIN",
  "VEGETABLES",
  "FRUITS",
  "LIVESTOCK",
  "MACHINERY",
  "SERVICES",
  "OTHER",
] as const;
const units = ["KG", "L", "PIECE"] as const;

// Wspólne reguły
const marketAnnouncementValidatorConfig = {
  title: z.string().min(3, "Tytuł musi mieć minimum 3 znaki"),
  description: z.string().min(10, "Opis musi mieć minimum 10 znaków"),
  type: z.enum(listingTypes, {
    required_error: "Typ ogłoszenia jest wymagany",
  }),
  category: z.enum(categories, {
    required_error: "Kategoria jest wymagana",
  }),
  price: z
    .number({
      required_error: "Cena jest wymagana",
      invalid_type_error: "Cena musi być liczbą",
    })
    .nonnegative("Cena nie może być ujemna"),
  unit: z.enum(units, {
    required_error: "Jednostka jest wymagana",
  }),
  location: z.object({
    latitude: z.number({
      required_error: "Szerokość geograficzna jest wymagana",
    }),
    longitude: z.number({
      required_error: "Długość geograficzna jest wymagana",
    }),
  }),
  userId: z.string().uuid("Niepoprawne ID użytkownika"),
};

// CREATE validator
const createMarketAnnouncementValidatorShape = {
  title: marketAnnouncementValidatorConfig.title,
  description: marketAnnouncementValidatorConfig.description,
  type: marketAnnouncementValidatorConfig.type,
  category: marketAnnouncementValidatorConfig.category,
  price: marketAnnouncementValidatorConfig.price,
  unit: marketAnnouncementValidatorConfig.unit,
  location: marketAnnouncementValidatorConfig.location,
  userId: marketAnnouncementValidatorConfig.userId,
} satisfies Record<keyof CreateMarketAnnouncementInput, z.ZodTypeAny>;

export const createMarketAnnouncementValidator = z
  .object(createMarketAnnouncementValidatorShape)
  .strict();

// UPDATE validator
export const updateMarketAnnouncementValidator =
  createMarketAnnouncementValidator.partial();
