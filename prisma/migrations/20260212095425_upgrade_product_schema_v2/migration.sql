/*
  Warnings:

  - You are about to drop the column `details` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `is_published` on the `Product` table. All the data in the column will be lost.
  - The `images` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "details",
DROP COLUMN "is_published",
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "options" JSONB,
ADD COLUMN     "preOrder" JSONB,
ADD COLUMN     "pricingDetail" JSONB,
ADD COLUMN     "ribbons" TEXT[],
ADD COLUMN     "rpgDetails" JSONB,
ADD COLUMN     "sections" JSONB,
ADD COLUMN     "seo" JSONB,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "videos" JSONB,
ALTER COLUMN "price" DROP DEFAULT,
DROP COLUMN "images",
ADD COLUMN     "images" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
