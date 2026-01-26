/*
  Warnings:

  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "phone" INTEGER,
ADD COLUMN     "status" TEXT DEFAULT 'ACTIVE',
DROP COLUMN "role",
ADD COLUMN     "role" TEXT DEFAULT 'CUSTOMER';
