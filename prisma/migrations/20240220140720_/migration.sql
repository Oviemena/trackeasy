-- CreateEnum
CREATE TYPE "PriorityType" AS ENUM ('LOW', 'NORMAL', 'HIGH');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "priority" "PriorityType" NOT NULL DEFAULT 'NORMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,
    "duration" TEXT NOT NULL,
    "status" "StatusType" NOT NULL DEFAULT 'IN_PROGRESS',
    "done" BOOLEAN NOT NULL DEFAULT false,
    "delayed" BOOLEAN NOT NULL DEFAULT false,
    "assignedId" TEXT NOT NULL,
    "escalatorId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Escalator" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_id_key" ON "Actor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Escalator_id_key" ON "Escalator"("id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedId_fkey" FOREIGN KEY ("assignedId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_escalatorId_fkey" FOREIGN KEY ("escalatorId") REFERENCES "Escalator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
