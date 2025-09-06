-- CreateTable
CREATE TABLE "public"."Client" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "birth" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "rg" VARCHAR(20) NOT NULL,
    "cpf" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);
