-- CreateTable
CREATE TABLE "Assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "framework" TEXT NOT NULL,
    "controlId" TEXT NOT NULL,
    "controlName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "testerName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Assigned',
    "evidenceFile" TEXT,
    "testerStatus" TEXT,
    "testerRemarks" TEXT,
    "ownerStatus" TEXT,
    "ownerRemarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
