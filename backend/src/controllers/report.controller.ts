// backend/src/controllers/report.controller.ts

import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

type AssignmentRecord = {
  id: number;
  framework: string;
  controlId: string;
  controlName: string;
  ownerName: string;
  testerName: string;
  testerStatus: string | null;
  ownerStatus: string | null;
  evidenceFile: string | null;
  updatedAt: Date;
};

const getStatusAndScore = (assignment: AssignmentRecord) => {
  if (assignment.ownerStatus === "Approved") {
    return {
      status: "Implemented",
      score: 100,
    };
  }

  if (assignment.ownerStatus === "Rejected") {
    return {
      status: "Not Implemented",
      score: 0,
    };
  }

  if (assignment.testerStatus === "Partially Implemented") {
    return {
      status: "Partially Implemented",
      score: 50,
    };
  }

  return {
    status: "Pending Review",
    score: 0,
  };
};

const getEvidenceName = (raw: string | null) => {
  if (!raw || raw === "[]" || raw.trim() === "") {
    return "No Evidence Uploaded";
  }

  try {
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return (
        parsed[0]?.fileName ||
        parsed[0]?.name ||
        "Evidence Uploaded"
      );
    }
  } catch {
    return raw;
  }

  return "No Evidence Uploaded";
};

const getAllAssignments = async () => {
  return prisma.assignment.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
};

/* =======================================================
   DASHBOARD REPORT (/dashboard)
======================================================= */
export const getDashboardReport = async (
  _req: Request,
  res: Response
) => {
  try {
    const assignments = await getAllAssignments();

    const totalControls = assignments.length;

    const accepted = assignments.filter(
      (item) => item.ownerStatus === "Approved"
    ).length;

    const rejected = assignments.filter(
      (item) => item.ownerStatus === "Rejected"
    ).length;

    const pending = assignments.filter(
      (item) =>
        item.ownerStatus !== "Approved" &&
        item.ownerStatus !== "Rejected"
    ).length;

    const implementedScore =
      totalControls === 0
        ? 0
        : Math.round((accepted / totalControls) * 100);

    const rows = assignments.map((assignment) => {
      const { status, score } = getStatusAndScore(
        assignment as AssignmentRecord
      );

      return {
        id: assignment.id,
        framework: assignment.framework,
        controlId: assignment.controlId,
        controlName: assignment.controlName,
        owner: assignment.ownerName,
        tester: assignment.testerName,
        evidence: getEvidenceName(assignment.evidenceFile),
        status,
        score,
        uploadedAt: assignment.updatedAt,
      };
    });

    res.json({
      success: true,
      summary: {
        totalControls,
        accepted,
        rejected,
        pending,
        implementedScore,
      },
      rows,
    });
  } catch (error) {
    console.error("DASHBOARD REPORT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate dashboard report",
    });
  }
};

/* =======================================================
   COMPLIANCE REPORT (/reports)
   NOW FULLY IN SYNC WITH DASHBOARD
======================================================= */
export const getComplianceReport = async (
  _req: Request,
  res: Response
) => {
  try {
    const assignments = await getAllAssignments();

    const grouped = new Map<string, AssignmentRecord[]>();

    assignments.forEach((item) => {
      const framework = item.framework || "Other";

      if (!grouped.has(framework)) {
        grouped.set(framework, []);
      }

      grouped.get(framework)?.push(
        item as AssignmentRecord
      );
    });

    const data = Array.from(grouped.entries()).map(
      ([framework, items]) => {
        const totalControls = items.length;

        let implemented = 0;
        let partial = 0;
        let notImplemented = 0;

        items.forEach((item) => {
          const { score } = getStatusAndScore(item);

          if (score === 100) {
            implemented++;
          } else if (score === 50) {
            partial++;
          } else {
            notImplemented++;
          }
        });

        const percentage =
          totalControls === 0
            ? 0
            : Math.round(
                (implemented / totalControls) * 100
              );

        return {
          framework,
          percentage,
          totalControls,
          implemented,
          partial,
          notImplemented,
        };
      }
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("COMPLIANCE REPORT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate compliance report",
    });
  }
};