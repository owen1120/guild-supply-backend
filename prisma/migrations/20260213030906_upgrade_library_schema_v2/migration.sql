/*
  Warnings:

  - You are about to drop the column `content` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the `_ArticleToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToProduct" DROP CONSTRAINT "_ArticleToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToProduct" DROP CONSTRAINT "_ArticleToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "content",
DROP COLUMN "summary",
DROP COLUMN "tags",
DROP COLUMN "thumbnail",
ADD COLUMN     "authorInfo" JSONB,
ADD COLUMN     "contentBody" JSONB,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "linkedProducts" JSONB,
ADD COLUMN     "location" JSONB,
ADD COLUMN     "rpgMetadata" JSONB,
ADD COLUMN     "subtitle" TEXT,
ALTER COLUMN "category" SET DEFAULT 'GENERAL';

-- DropTable
DROP TABLE "_ArticleToProduct";
