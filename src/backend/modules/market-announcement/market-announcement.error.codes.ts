import { AppErrorShape } from "@/backend/lib/errors/app.error";

export enum MarketAnnouncementErrorCode {
  MARKET_ANNOUNCEMENT_NOT_EXISTS = "MARKET_ANNOUNCEMENT_NOT_EXISTS",
  MARKET_ANNOUNCEMENT_DELETE_ERROR = "MARKET_ANNOUNCEMENT_DELETE_ERROR",
}

export const marketAnnouncementError: Record<
  MarketAnnouncementErrorCode,
  AppErrorShape<MarketAnnouncementErrorCode>
> = {
  [MarketAnnouncementErrorCode.MARKET_ANNOUNCEMENT_NOT_EXISTS]: {
    errorCode: MarketAnnouncementErrorCode.MARKET_ANNOUNCEMENT_NOT_EXISTS,
    status: 404,
  },
  [MarketAnnouncementErrorCode.MARKET_ANNOUNCEMENT_DELETE_ERROR]: {
    errorCode: MarketAnnouncementErrorCode.MARKET_ANNOUNCEMENT_DELETE_ERROR,
    status: 500,
  },
};

export const marketAnnouncementErrorMessage: Record<
  MarketAnnouncementErrorCode,
  string
> = {
  [MarketAnnouncementErrorCode.MARKET_ANNOUNCEMENT_NOT_EXISTS]:
    "Nie udało się pobrać ogłoszenia.",
  [MarketAnnouncementErrorCode.MARKET_ANNOUNCEMENT_DELETE_ERROR]:
    "Nie udało się usunąć ogłoszenia.",
};
