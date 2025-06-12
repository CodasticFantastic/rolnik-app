import { prisma } from "@/backend/lib/prisma/prisma.client";
import { AppError } from "@/backend/lib/errors/app.error";
import { marketAnnouncementMapper } from "./market-announcement.mapper";
import {
  CreateMarketAnnouncementInput,
  MarketAnnouncement,
  UpdateMarketAnnouncementInput,
} from "./market-announcement.types";
import { marketAnnouncementError } from "./market-announcement.error.codes";
import { SanitizedUser } from "../user/user.types";
import { globalError } from "@/backend/lib/errors/global.error.codes";

export const marketAnnouncementService = {
  async getMarketAnnouncementById(id: string): Promise<MarketAnnouncement> {
    const announcement = await prisma.marketAnnouncement.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!announcement) {
      throw new AppError({
        ...marketAnnouncementError.MARKET_ANNOUNCEMENT_NOT_EXISTS,
      });
    }

    return marketAnnouncementMapper.fullMarketAnnouncementResponse(
      announcement
    );
  },

  async getAllMarketAnnouncements(): Promise<MarketAnnouncement[]> {
    const marketAnnouncements = await prisma.marketAnnouncement.findMany({
      include: { user: true },
    });
    const data: MarketAnnouncement[] = marketAnnouncements.map(
      marketAnnouncementMapper.fullMarketAnnouncementResponse
    );

    return data;
  },

  async createMarketAnnouncement(
    data: CreateMarketAnnouncementInput,
    userId: string
  ): Promise<MarketAnnouncement> {
    const created = await prisma.marketAnnouncement.create({
      data: {
        ...data,
        price: data.price,
        userId,
      },
      include: { user: true },
    });

    return marketAnnouncementMapper.fullMarketAnnouncementResponse(created);
  },

  async updateMarketAnnouncement(
    id: string,
    data: UpdateMarketAnnouncementInput,
    currentUser: SanitizedUser
  ): Promise<MarketAnnouncement> {
    const existingAnnouncement =
      await marketAnnouncementService.getMarketAnnouncementById(id);

    if (existingAnnouncement.userId !== currentUser.id) {
      throw new AppError({ ...globalError.FORBIDDEN });
    }

    const updated = await prisma.marketAnnouncement.update({
      where: { id },
      data: {
        ...data,
        price: data.price !== undefined ? data.price : undefined,
      },
      include: { user: true },
    });

    return marketAnnouncementMapper.fullMarketAnnouncementResponse(updated);
  },

  async deleteMarketAnnouncement(id: string): Promise<{ success: true }> {
    try {
      await marketAnnouncementService.getMarketAnnouncementById(id);
      await prisma.marketAnnouncement.delete({ where: { id } });
      return { success: true };
    } catch {
      throw new AppError({
        ...marketAnnouncementError.MARKET_ANNOUNCEMENT_DELETE_ERROR,
      });
    }
  },
};
