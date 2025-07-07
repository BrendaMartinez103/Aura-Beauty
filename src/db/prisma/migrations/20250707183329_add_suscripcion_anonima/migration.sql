-- AlterTable
ALTER TABLE "Servicio" ALTER COLUMN "imageUrl" SET DEFAULT '';

-- CreateTable
CREATE TABLE "SuscripcionAnonima" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sub" JSONB NOT NULL,

    CONSTRAINT "SuscripcionAnonima_pkey" PRIMARY KEY ("id")
);
