-- CreateEnum
CREATE TYPE "PriorityType" AS ENUM ('LOW', 'NORMAL', 'HIGH');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "priority" "PriorityType" NOT NULL DEFAULT 'NORMAL',
    "creatdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" NOT NULL DEFAULT 'IN_PROGRESS',
    "assignedId" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "delayed" BOOLEAN NOT NULL DEFAULT false,
    "escalatorId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escalator" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "assignedId" TEXT NOT NULL,

    CONSTRAINT "Escalator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Task_assignedId_key" ON "Task"("assignedId");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_id_key" ON "Actor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_email_key" ON "Actor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_phone_key" ON "Actor"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Escalator_id_key" ON "Escalator"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Escalator_phone_key" ON "Escalator"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Escalator_email_key" ON "Escalator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Escalator_assignedId_key" ON "Escalator"("assignedId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedId_fkey" FOREIGN KEY ("assignedId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_escalatorId_fkey" FOREIGN KEY ("escalatorId") REFERENCES "Escalator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escalator" ADD CONSTRAINT "Escalator_assignedId_fkey" FOREIGN KEY ("assignedId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
