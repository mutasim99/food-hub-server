/*
  Warnings:

  - Added the required column `image` to the `ProviderProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProviderProfile" ADD COLUMN     "image" TEXT NOT NULL;
