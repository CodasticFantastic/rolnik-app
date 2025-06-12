-- CreateEnum
CREATE TYPE "MarketAnnouncementType" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('GRAIN', 'VEGETABLES', 'FRUITS', 'LIVESTOCK', 'MACHINERY', 'SERVICES', 'OTHER');

-- CreateTable
CREATE TABLE "MarketAnnouncement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "MarketAnnouncementType" NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "unit" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MarketAnnouncement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MarketAnnouncement" ADD CONSTRAINT "MarketAnnouncement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
