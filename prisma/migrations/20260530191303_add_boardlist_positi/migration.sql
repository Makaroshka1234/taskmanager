/*
  Warnings:

  - You are about to drop the column `position` on the `BoardList` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BoardList" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "position";
