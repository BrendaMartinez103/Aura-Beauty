/*
  Warnings:

  - You are about to drop the column `clienteId` on the `Detalle` table. All the data in the column will be lost.
  - You are about to drop the column `servicioId` on the `Detalle` table. All the data in the column will be lost.
  - Added the required column `categoria` to the `Detalle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Detalle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duracion` to the `Detalle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Detalle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `Detalle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Servicio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Detalle" DROP CONSTRAINT "Detalle_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Detalle" DROP CONSTRAINT "Detalle_servicioId_fkey";

-- AlterTable
ALTER TABLE "Detalle" DROP COLUMN "clienteId",
DROP COLUMN "servicioId",
ADD COLUMN     "categoria" TEXT NOT NULL,
ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "duracion" INTEGER NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL;

