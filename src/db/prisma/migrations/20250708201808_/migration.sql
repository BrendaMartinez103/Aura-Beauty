/*
  Warnings:

  - You are about to drop the column `creadoEn` on the `Detalle` table. All the data in the column will be lost.
  - You are about to drop the column `fechaHora` on the `Detalle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Detalle" DROP COLUMN "creadoEn",
DROP COLUMN "fechaHora";
