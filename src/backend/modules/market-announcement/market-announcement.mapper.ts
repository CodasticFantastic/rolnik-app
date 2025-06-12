import { userMapper } from "../user/user.mapper";
import { MarketAnnouncement } from "./market-announcement.types";
import {
  MarketAnnouncement as PrismaMarketAnnouncement,
  User,
} from "@prisma/client";

export const marketAnnouncementMapper = {
  fullMarketAnnouncementResponse: (
    ma: PrismaMarketAnnouncement & { user: User }
  ): MarketAnnouncement => {
    return {
      id: ma.id,
      title: ma.title,
      description: ma.description,
      type: ma.type,
      category: ma.category,
      price: ma.price.toNumber(),
      unit: ma.unit,
      location: ma.location,
      createdAt: ma.createdAt.toISOString(),
      updatedAt: ma.updatedAt.toISOString(),
      userId: ma.userId,
      isActive: ma.isActive,
      user: userMapper.sanitizedUserResponse(ma.user),
    } satisfies MarketAnnouncement;
  },
};
