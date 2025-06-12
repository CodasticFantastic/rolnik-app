import { MarketAnnouncementType, ProductCategory, Units } from "@prisma/client";
import { SanitizedUser } from "../user/user.types";

export interface MarketAnnouncement {
  id: string;
  title: string;
  description: string;
  type: MarketAnnouncementType;
  category: ProductCategory;
  price: number;
  unit: Units;
  // location: Location;
  location: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: SanitizedUser;
  isActive: boolean;
}

export type CreateMarketAnnouncementInput = Omit<
  MarketAnnouncement,
  "id" | "createdAt" | "updatedAt" | "user" | "isActive"
>;

export type UpdateMarketAnnouncementInput =
  Partial<CreateMarketAnnouncementInput>;

// export interface Location {
//   latitude: number;
//   longitude: number;
// }

export const UnitsLabels: Record<Units, string> = {
  KILOGRAM: "kg",
  LITER: "litr",
  PIECE: "szt",
  GRAM: "g",
  TON: "t",
};
