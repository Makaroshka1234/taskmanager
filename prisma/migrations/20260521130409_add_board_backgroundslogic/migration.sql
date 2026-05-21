-- CreateEnum
CREATE TYPE "BoardType" AS ENUM ('COLOR', 'IMAGE');

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "backgroundImageUrl" TEXT,
ADD COLUMN     "backgroundType" TEXT NOT NULL DEFAULT 'COLOR',
ADD COLUMN     "boardColor" TEXT,
ADD COLUMN     "uploadedImages" TEXT[] DEFAULT ARRAY[]::TEXT[];
