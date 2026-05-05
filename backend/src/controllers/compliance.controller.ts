// backend/src/controllers/compliance.controller.ts

import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getCompliance = async (
  _req: Request,
  res: Response
) => {
  try {
    const assignments = await prisma.assignment.findMany();

    const frameworks = [
      "ISO 27001",
      "NIST CSF",
      "DPDPA 2023",
      "ISO 42001",
    ];

    const data = frameworks.map((framework) => {
      const items = assignments.filter(
        (item) => item.framework === framework
      );

      const totalControls = items.length;

      const implemented = items.filter(
        (item) => item.ownerStatus === "Approved"
      ).length;

      const partial = items.filter(
        (item) =>
          item.ownerStatus !== "Approved" &&
          item.testerStatus === "Partially Implemented"
      ).length;

      const notImplemented =
        totalControls - implemented - partial;

      const score =
        totalControls === 0
          ? 0
          : Math.round(
              (implemented / totalControls) * 100
            );

      return {
        framework,
        score,
        implemented,
        partial,
        notImplemented,
        totalControls,
      };
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("COMPLIANCE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch compliance data",
    });
  }
};