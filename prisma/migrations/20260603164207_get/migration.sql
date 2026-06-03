/*
  Warnings:

  - A unique constraint covering the columns `[id,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorEmail` to the `TaskComment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TaskComment" DROP CONSTRAINT "TaskComment_creatorId_fkey";

-- AlterTable
ALTER TABLE "TaskComment" ADD COLUMN     "creatorEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_email_key" ON "User"("id", "email");

-- AddForeignKey
ALTER TABLE "TaskComment" ADD CONSTRAINT "TaskComment_creatorId_creatorEmail_fkey" FOREIGN KEY ("creatorId", "creatorEmail") REFERENCES "User"("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
