/*
  Warnings:

  - You are about to drop the column `description` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `rewardPoints` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `target` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Quest` table. All the data in the column will be lost.
  - Added the required column `displayInfo` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectives` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rewards` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestType" AS ENUM ('MAIN', 'DAILY', 'EVENT');

-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "description",
DROP COLUMN "expiresAt",
DROP COLUMN "rewardPoints",
DROP COLUMN "target",
DROP COLUMN "title",
ADD COLUMN     "constraints" JSONB,
ADD COLUMN     "displayInfo" JSONB NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "objectives" JSONB NOT NULL,
ADD COLUMN     "repeatable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rewards" JSONB NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "type" "QuestType" NOT NULL DEFAULT 'MAIN';
