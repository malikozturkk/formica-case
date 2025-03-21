/*
  Warnings:

  - You are about to drop the column `travelId` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `travel_id` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_travelId_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_userId_fkey";

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "travelId",
DROP COLUMN "userId",
ADD COLUMN     "travel_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_travel_id_fkey" FOREIGN KEY ("travel_id") REFERENCES "travels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
