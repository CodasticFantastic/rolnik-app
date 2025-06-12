/*
  Warnings:

  - Changed the type of `unit` on the `MarketAnnouncement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Units" AS ENUM ('LITER', 'GRAM', 'KILOGRAM', 'TON', 'PIECE');

-- AlterTable
ALTER TABLE "MarketAnnouncement" DROP COLUMN "unit",
ADD COLUMN     "unit" "Units" NOT NULL;
